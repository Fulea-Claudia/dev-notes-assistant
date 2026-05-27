# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start dev server (localhost:5173 with HMR)
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Architecture

### Three-Panel Layout Pattern

The app uses a horizontal flexbox layout with three fixed/flexible panels:

```
┌─────────────┬──────────────────┬──────────────┐
│   Sidebar   │   Main Area      │   AI Panel   │
│  (250px)    │   (flex: 1)      │   (280px)    │
└─────────────┴──────────────────┴──────────────┘
```

- **Sidebar** (`src/App.jsx` - `<aside className="sidebar">`): Fixed 250px width, lists notes, navigation
- **Main Area** (`src/App.jsx` - `<main className="main-area">`): Takes remaining space, contains textarea for note editing
- **AI Panel** (`src/App.jsx` - `<aside className="ai-panel">`): Fixed 280px width, chat/assistant interaction

All panels are currently in `App.jsx`. As the app grows, split into separate components (`Sidebar.jsx`, `MainArea.jsx`, `AIPanel.jsx`).

## State Management

The app uses React hooks to manage:
- `notes` — array of note objects: `{ id, title, content }`
- `selectedNoteId` — currently active note
- `editorContent` — textarea value (controlled input, derived from selected note)
- `messages` — chat history: `[{ id, role, text }, ...]` (session-only, not persisted)
- `chatInput` — AI input field value (session-only, not persisted)

**Persistence:** `notes` and `selectedNoteId` are persisted to `localStorage` via `useEffect` hooks. Both initialize from storage on app mount using lazy initializers in `useState()`, and sync automatically on every change. This means the app state survives page refreshes.

## Key Functions

- `handleNoteSelect(note)` — Switch to a note, load its content
- `handleAddNote()` — Create new note with `prompt()` for name
- `handleDeleteNote(noteId)` — Remove note, auto-switch if current note deleted
- `handleSave()` — Update the selected note's content in the notes array
- `handleChatKeyDown(e)` — Send chat message on Enter, add to messages array


## Important Technical Notes

### npm Registry Configuration

The `.npmrc` file overrides the global npm registry to use `registry.npmjs.org` (public npm). This is critical because:
- The global `~/.npmrc` on this machine points to Henkel's private Azure DevOps feed
- Public packages (Vite, React, etc.) return 403 from the private feed
- The local `.npmrc` in this repo ensures anyone working on this project (including those on corporate machines) can install dependencies without errors

**Do not remove or modify `.npmrc`** without understanding the implications for team members.


## Team Context

This is a collaborative learning project. Team members may be new to React. Keep component code beginner-friendly and well-structured for educational value.
