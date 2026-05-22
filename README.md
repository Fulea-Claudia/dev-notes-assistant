# DevNotes AI

A lightweight AI-assisted developer notes application built with React. 
The app allows developers to create and organize technical notes, snippets, and documentation, then use AI features to summarize content, answer questions, and surface relevant information from their personal knowledge base.

The project is focused on learning Claude-assisted development workflows, including permissions, context management, hooks, MCP integrations, and reusable AI skills.

## Features

- Left sidebar for note management
- Main editor area for writing notes
- Right AI assistant panel for quick help

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:

2. Install dependencies:
npm install

3. Start the development server:
npm run dev

The app will open at http://localhost:5173

### Project Structure

- src/App.jsx — Main app component with the three-panel layout
- src/index.css — Styling
- src/main.jsx — React app entry point

## Current Implementation and next steps
- ✅ Three-panel layout (sidebar, main area, AI panel)
- ✅ Note selection (click to switch between notes)
- ✅ Note persistence in state (save/load note content)
- ✅ Add new notes with custom names (via prompt)
- ✅ Delete notes (with safety — can't delete last note)
- ✅ Chat messages (send on Enter, display user + AI messages)
- ⏳ Editable note titles (inline editing on click)
- ⏳ Note persistence to localStorage (survive page refresh)
- ⏳ Auto-save functionality (save as you type)
- ⏳ Claude AI integration (real responses in chat panel)