# Bloc-Notes React (Markdown Editor & Preview)

Une application de bloc-notes en React qui permet :

- de créer, modifier et supprimer des notes en Markdown
- d’afficher en live un aperçu HTML converti depuis le Markdown
- de réorganiser les notes (drag & drop) dans la barre latérale
- de persister les notes dans le `localStorage` pour les retrouver au rechargement

L’application est entièrement stylée en SCSS pour être responsive et proche d’un thème sombre/rouge, avec :

- Sidebar (20 % largeur) pour la liste de notes
- Éditeur Markdown (40 % largeur)
- Preview HTML (40 % largeur)
- Responsivité pour tablettes et mobiles via media queries SCSS

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Installation et démarrage](#installation-et-démarrage)
3. [Structure du projet](#structure-du-projet)
4. [Détails des composants et fichiers clés](#détails-des-composants-et-fichiers-clés)
5. [Drag & Drop dans la sidebar](#drag--drop-dans-la-sidebar)
6. [Styles SCSS & Responsivité](#styles-scss--responsivité)
7. [Personnalisation et extensions possibles](#personnalisation-et-extensions-possibles)
8. [Crédits](#crédits)

---

## Fonctionnalités

- **Créer une nouvelle note** :  
  Le bouton “Ajouter une note” dans la barre latérale crée une note “Nouvelle note” avec titre/modèle vide, et la sélectionne automatiquement.

- **Lister les notes** :  
  Affiche dans la sidebar chaque note par son titre et un extrait du début de son contenu (30 caractères environ).

- **Sélectionner une note** :  
  Cliquer sur une note dans la barre latérale charge son titre et son corps en Markdown dans l’éditeur.

- **Éditeur Markdown** :

  - `<input>` pour modifier le titre
  - `<textarea>` pour écrire le contenu Markdown
  - Boutons “Sauvegarder” et “Supprimer” en bas de l’éditeur

- **Preview HTML live** :  
  Convertit chaque note Markdown en HTML avec [Showdown](https://github.com/showdownjs/showdown) et l’affiche en direct dans la colonne de droite.

- **Supprimer une note** :  
  Le bouton “Supprimer” retire la note actuellement sélectionnée de la liste, puis sélectionne la note suivante (ou affiche “Sélectionnez ou créez une note” si aucune n’existe).

- **Drag & Drop** :

  - Chaque item (note) de la sidebar est “draggable”.
  - On peut faire glisser une note et la poser à l’emplacement souhaité pour réordonner la liste.
  - L’ordre mis à jour est automatiquement enregistré dans le `localStorage`.

- **Persistance** :
  - Lorsqu’on crée/modifie/supprime/réorganise des notes, tout est synchronisé dans `localStorage` (clé `"notes"`).
  - Au rechargement de la page, l’application lit `localStorage` et restaure la liste et la note sélectionnée au premier lancement (s’il y a au moins une note).

---

## Installation et démarrage

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Slingod/W5D2DEV.git
   cd bloc-notes-react
   ```

### Installer les dépendances

L’application utilise :

React v18+

Showdown (pour la conversion Markdown → HTML)

Sass (pour compiler les fichiers .scss)

    ```bash

npm install

````

```bash

npm start
````

```bash

npm run build

```

## Structure du projet

pgsql
Copier
Modifier
bloc-notes-react/
├── node_modules/
├── public/
│ ├── index.html
│ └── …
├── src/
│ ├── components/
│ │ ├── MarkdownInput.js
│ │ └── NoteDisplay.js
│ ├── App.js
│ ├── App.scss
│ ├── index.js
│ ├── index.scss
│ ├── reportWebVitals.js
│ └── … (tests, logos, etc.)
├── .gitignore
├── package.json
├── package-lock.json (ou yarn.lock)
└── README.md

### Liens utiles pour l'exo

- [React Documentation](https://reactjs.org/)
- [Markdown Guide](https://www.markdownguide.org/)

## Textes Bidon pour l'exo :

# Titre de niveau 1

Bienvenue dans ce document de démonstration **Markdown** !  
Ici, tu trouveras des exemples de presque toutes les syntaxes que Markdown supporte.

---

## Titres et mise en forme de texte

### Niveaux de titres

Un titre de niveau 2

## Titre de niveau 2

Un titre de niveau 3

### Titre de niveau 3

### Texte en gras, italique et combiné

- **Texte en gras**
- _Texte en italique_
- **_Texte en gras et italique_**
- ~~Texte barré~~
- **Texte en gras avec underscores**
- _Texte en italique avec underscores_

### Texte et lignes

Une phrase avec un retour simple  
Deux espaces à la fin de la ligne permettent un « saut de ligne » ici.

Un **nouveau paragraphe** commence ici.

---

## Listes

### Liste non ordonnée

- Élément 1
  - Sous-élément 1.1
    - Sous-sous-élément 1.1.1
  - Sous-élément 1.2
- Élément 2
- Élément 3

### Liste ordonnée

1. Premier élément
2. Deuxième élément
   1. Sous-élément 2.1
   2. Sous-élément 2.2
3. Troisième élément

---

## Liens et images

### Lien simple

- [React Documentation](https://reactjs.org/)
- [Markdown Guide](https://www.markdownguide.org/)

### Lien avec titre

[OpenAI](https://openai.com “Vers le site d’OpenAI”)

### Image

![Logo React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg “Logo React”)  
_(Tu peux remplacer cette URL par une image locale si tu préfères.)_

---

## Blocs de code

### Code inline

Voici un appel à une fonction : `const sum = (a, b) => a + b;`  
Et un autre exemple : `console.log("Hello world");`

### Bloc de code avec coloration (fenced code block)

\`\`\`js
// Exemple de code JavaScript
function greeter(name) {
console.log(\`Bonjour, \${name} !\`);
}

const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map((n) => n \* n);
console.log(squared);
\`\`\`

\`\`\`python

# Exemple de code Python

def hello(name):
print(f"Bonjour, {name} !")

if **name** == "**main**":
hello("Monde")
\`\`\`

### Bloc de code sans langage

\`\`\`
Ligne 1
Ligne 2 avec indentation
Ligne 3
\`\`\`

---

## Citations

> Ceci est un bloc de citation.  
> Tu peux citer plusieurs lignes en commençant chaque ligne par “>”.
>
> > > Tu peux imbriquer les citations :
> > >
> > > > Citation imbriquée.

---

## Tableaux

| Prénom  | Âge |         Ville |
| :------ | :-: | ------------: |
| Alice   | 30  |         Paris |
| Bob     | 25  |      New York |
| Charlie | 28  | San Francisco |

> **Note** :
>
> - Les deux-points `:` à gauche ou à droite définissent l’alignement :
>   - `:---` (gauche),
>   - `:---:` (centré),
>   - `---:` (droite).

---

## Règles horizontales

Tu peux insérer une ligne horizontale avec :

- Trois tirets :

- Trois astérisques :

- Trois underscores :

---

## Formulaires et cases à cocher (checkboxes)

- [x] Tâche terminée
- [ ] Tâche en attente
- [ ] Tâche à faire plus tard

---

## Images en ligne (base64)

_(Pour tester l’inclusion d’images inline, voici un petit carré rouge encodé en base64)_  
`![Carré Rouge](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8NxN+vAAAALXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJp2bvwAAAEhJREFUGNNNzVkSgDAQRFE0sIknWvP/ZwyDaT0IfKXWmTjncSpOZ5nYKwRnkwBZvux6RPwCOqnIfsFz0tsd+/ITYpdH6VJtraGsnz6xIlfTkUVfEKWCr730TXj2VABDXYbZQAAAABJRU5ErkJggg==`)  
Cette image s’affichera comme un petit carré rouge.

---

## (Facultatif) Footnotes (si supporté par ton moteur Markdown)

Ici, un exemple de note de bas de page[^1] pour tester :

Le Markdown standard ne prend pas en charge toutes les variantes des “footnotes”, mais certains rendus comme **GitHub** ou **Pandoc** les supportent.

[^1]: Ceci est le texte de la note de bas de page. Tu peux écrire plus long si nécessaire.

---

## (Facultatif) HTML brut

Tu peux également inclure du HTML directement :

<div style="background: #f0f0f0; padding: 10px; border-radius: 4px;">
<strong>Ceci est un bloc HTML</strong> : il s’affiche tel quel, sans être interprété en Markdown.
<ul>
  <li>Item 1 en HTML</li>
  <li>Item 2 en HTML</li>
  <li>Item 3 en HTML</li>
</ul>
</div>

---

## Exemple final

> **Titre dynamique** :  
> Ceci conclut notre démonstration des syntaxes Markdown. Copie ce texte dans ton éditeur pour tester :

```markdown
# Titre de niveau 1

Bienvenue dans ce document de démonstration **Markdown** !  
Ici, tu trouveras des exemples de presque toutes les syntaxes que Markdown supporte.

---

## Titres et mise en forme de texte

### Niveaux de titres

Un titre de niveau 2

## Titre de niveau 2

Un titre de niveau 3

### Titre de niveau 3

### Texte en gras, italique et combiné

- **Texte en gras**
- _Texte en italique_
- **_Texte en gras et italique_**
- ~~Texte barré~~
- **Texte en gras avec underscores**
- _Texte en italique avec underscores_

### Texte et lignes

Une phrase avec un retour simple  
Deux espaces à la fin de la ligne permettent un « saut de ligne » ici.

Un **nouveau paragraphe** commence ici.

---

## Listes

### Liste non ordonnée

- Élément 1
- Sous-élément 1.1
  - Sous-sous-élément 1.1.1
- Sous-élément 1.2
- Élément 2
- Élément 3

### Liste ordonnée

1. Premier élément
2. Deuxième élément
3. Sous-élément 2.1
4. Sous-élément 2.2
5. Troisième élément

---

## Liens et images

### Lien simple

- [React Documentation](https://reactjs.org/)
- [Markdown Guide](https://www.markdownguide.org/)

### Lien avec titre

[OpenAI](https://openai.com “Vers le site d’OpenAI”)

### Image

![Logo React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg “Logo React”)  
_(Tu peux remplacer cette URL par une image locale si tu préfères.)_

---

## Blocs de code

### Code inline

Voici un appel à une fonction : `const sum = (a, b) => a + b;`  
Et un autre exemple : `console.log("Hello world");`

### Bloc de code avec coloration (fenced code block)

\`\`\`js
// Exemple de code JavaScript
function greeter(name) {
console.log(\`Bonjour, \${name} !\`);
}

const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map((n) => n \* n);
console.log(squared);
\`\`\`

\`\`\`python

# Exemple de code Python

def hello(name):
print(f"Bonjour, {name} !")

if **name** == "**main**":
hello("Monde")
\`\`\`

### Bloc de code sans langage

\`\`\`
Ligne 1
Ligne 2 avec indentation
Ligne 3
\`\`\`

---

## Citations

> Ceci est un bloc de citation.  
> Tu peux citer plusieurs lignes en commençant chaque ligne par “>”.
>
> > > Tu peux imbriquer les citations :
> > >
> > > > Citation imbriquée.

---

## Tableaux

| Prénom  | Âge |         Ville |
| :------ | :-: | ------------: |
| Alice   | 30  |         Paris |
| Bob     | 25  |      New York |
| Charlie | 28  | San Francisco |

> **Note** :
>
> - Les deux-points `:` à gauche ou à droite définissent l’alignement :
>   - `:---` (gauche),
>   - `:---:` (centré),
>   - `---:` (droite).

---

## Règles horizontales

Tu peux insérer une ligne horizontale avec :

- Trois tirets :

- Trois astérisques :

- Trois underscores :

---

## Formulaires et cases à cocher (checkboxes)

- [x] Tâche terminée
- [ ] Tâche en attente
- [ ] Tâche à faire plus tard

---

## Images en ligne (base64)

_(Pour tester l’inclusion d’images inline, voici un petit carré rouge encodé en base64)_  
`![Carré Rouge](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8NxN+vAAAALXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJp2bvwAAAEhJREFUGNNNzVkSgDAQRFE0sIknWvP/ZwyDaT0IfKXWmTjncSpOZ5nYKwRnkwBZvux6RPwCOqnIfsFz0tsd+/ITYpdH6VJtraGsnz6xIlfTkUVfEKWCr730TXj2VABDXYbZQAAAABJRU5ErkJggg==`)  
Cette image s’affichera comme un petit carré rouge.

---

## (Facultatif) Footnotes (si supporté par ton moteur Markdown)

Ici, un exemple de note de bas de page[^1] pour tester :

Le Markdown standard ne prend pas en charge toutes les variantes des “footnotes”, mais certains rendus comme **GitHub** ou **Pandoc** les supportent.

[^1]: Ceci est le texte de la note de bas de page. Tu peux écrire plus long si nécessaire.

---

## (Facultatif) HTML brut

Tu peux également inclure du HTML directement :

<div style="background: #f0f0f0; padding: 10px; border-radius: 4px;">
<strong>Ceci est un bloc HTML</strong> : il s’affiche tel quel, sans être interprété en Markdown.
<ul>
  <li>Item 1 en HTML</li>
  <li>Item 2 en HTML</li>
  <li>Item 3 en HTML</li>
</ul>
</div>
```
