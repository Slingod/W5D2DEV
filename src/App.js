import React from 'react';
import Showdown from 'showdown';
import './App.scss';

class App extends React.Component {
  state = {
    notes: [],          // tableau de notes { id, title, body }
    selectedId: null,   // id de la note sélectionnée
    draftTitle: '',
    draftBody: ''
  };

  converter = new Showdown.Converter();

  // Id de la note en cours de glisser (drag)
  draggedId = null;

  componentDidMount() {
    const saved = localStorage.getItem('notes');
    if (saved) {
      const notes = JSON.parse(saved);
      this.setState(
        { notes, selectedId: notes[0]?.id || null },
        () => {
          const sel = this.state.notes.find(n => n.id === this.state.selectedId);
          if (sel) this.setState({ draftTitle: sel.title, draftBody: sel.body });
        }
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      localStorage.setItem('notes', JSON.stringify(this.state.notes));
    }
  }

  selectNote = (id) => {
    const note = this.state.notes.find(n => n.id === id);
    if (note) {
      this.setState({ selectedId: id, draftTitle: note.title, draftBody: note.body });
    }
  };

  createNote = () => {
    const id = Date.now();
    const newNote = { id, title: 'Nouvelle note', body: '' };
    this.setState(
      state => ({
        notes: [newNote, ...state.notes],
        selectedId: id,
        draftTitle: newNote.title,
        draftBody: newNote.body
      })
    );
  };

  saveNote = () => {
    this.setState(state => ({
      notes: state.notes.map(n =>
        n.id === state.selectedId
          ? { ...n, title: state.draftTitle, body: state.draftBody }
          : n
      )
    }));
  };

  deleteNote = () => {
    this.setState(state => {
      const filtered = state.notes.filter(n => n.id !== state.selectedId);
      const nextId = filtered[0]?.id || null;
      return {
        notes: filtered,
        selectedId: nextId,
        draftTitle: filtered[0]?.title || '',
        draftBody: filtered[0]?.body || ''
      };
    });
  };

  handleTitleChange = (e) => this.setState({ draftTitle: e.target.value });
  handleBodyChange = (e) => this.setState({ draftBody: e.target.value });

  // Méthodes de Drag & Drop pour la sidebar     //

  // Quand le drag commence, on mémorise l'id de la note qu'on déplace
  handleDragStart = (event, id) => {
    this.draggedId = id;
    // Pour Firefox : il faut mettre un dataTransfer même vide
    event.dataTransfer.setData('text/plain', '');
    // Optionnel : on peut réduire l'opacité de l'élément source
    event.currentTarget.style.opacity = '0.5';
  };

  // Quand on entre dans un <li> pendant le drag-over : il faut preventDefault()
  handleDragOver = (event) => {
    event.preventDefault();
  };

  // Quand on quitte un <li> pendant le drag : on restaure l'opacité
  handleDragLeave = (event) => {
    event.currentTarget.style.background = '';
  };

  // Lorsqu'on lâche (drop) la note sur un autre <li>
  handleDrop = (event, targetId) => {
    event.preventDefault();

    const draggedId = this.draggedId;
    if (draggedId === null || draggedId === targetId) {
      // Rien à faire si on drop sur soi-même
      return;
    }

    // Trouvons l'index de la note qu'on a déplacée, et l'index de la cible
    const notesCopy = [...this.state.notes];
    const fromIndex = notesCopy.findIndex(n => n.id === draggedId);
    const toIndex   = notesCopy.findIndex(n => n.id === targetId);

    if (fromIndex < 0 || toIndex < 0) {
      return; // sécurité
    }

    // On extrait l'élément déplacé
    const [movedNote] = notesCopy.splice(fromIndex, 1);
    // On l'insère à la nouvelle position
    notesCopy.splice(toIndex, 0, movedNote);

    // On met à jour la liste triée dans le state
    this.setState({ notes: notesCopy });

    // Si on lâche sur la note déjà sélectionnée, on garde la sélection
    // Sinon, on peut faire en sorte que la note déplacée reste sélectionnée
    // Ici on ne change pas selectedId, car seule l’ordre a évolué
    this.draggedId = null;
  };

  // Quand on termine le drag, on restaure l'opacité de l'élément source
  handleDragEnd = (event) => {
    event.currentTarget.style.opacity = '1';
  };
  
  // Fin des méthodes Drag & Drop                 //

  render() {
    const { notes, selectedId, draftTitle, draftBody } = this.state;
    const html = this.converter.makeHtml(draftBody);

    return (
      <div className="container">
        {/* ---------------------- SIDEBAR ---------------------- */}
        <aside className="sidebar">
          <button
            className="btn-new"
            onClick={this.createNote}
          >
            Ajouter une note
          </button>

          <ul className="note-list">
            {notes.map((note) => (
              <li
                key={note.id}
                className={note.id === selectedId ? 'active' : ''}
                draggable={true}
                // -----------------------------------------
                // On gère ici les évènements Drag & Drop
                // -----------------------------------------
                onDragStart={(e) => this.handleDragStart(e, note.id)}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={(e) => this.handleDrop(e, note.id)}
                onDragEnd={this.handleDragEnd}
                onClick={() => this.selectNote(note.id)}
              >
                <h4>{note.title}</h4>
                <p>{note.body.substring(0, 30)}...</p>
              </li>
            ))}
          </ul>
        </aside>

        {/* -------------------- ÉDITEUR ----------------------- */}
        <main className="editor">
          {selectedId ? (
            <>
              <input
                className="title-input"
                value={draftTitle}
                onChange={this.handleTitleChange}
                placeholder="Titre de la note"
              />
              <textarea
                className="body-input"
                value={draftBody}
                onChange={this.handleBodyChange}
                placeholder="Écris ton markdown ici…"
              />
              <div className="editor-buttons">
                <button
                  className="btn-save"
                  onClick={this.saveNote}
                >
                  Sauvegarder
                </button>
                <button
                  className="btn-delete"
                  onClick={this.deleteNote}
                >
                  Supprimer
                </button>
              </div>
            </>
          ) : (
            <p>Sélectionnez ou créez une note.</p>
          )}
        </main>

        {/* --------------------- PREVIEW ---------------------- */}
        <aside
          className="preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}

export default App;