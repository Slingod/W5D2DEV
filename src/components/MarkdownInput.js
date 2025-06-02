import React from 'react';

export default function MarkdownInput({ title, setTitle, markdown, setMarkdown }) {
  return (
    <>
      <input
        className="title-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Titre de la note"
      />
      <textarea
        className="body-input"
        value={markdown}
        onChange={e => setMarkdown(e.target.value)}
        placeholder="Écris ton markdown ici…"
      />
    </>
  );
}