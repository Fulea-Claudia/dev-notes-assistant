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

The app features three main sections:

### Left Sidebar

- ✅ Note list with click-to-select and scroll option through them
- ✅ Timestamps on notes (last modified date)
- ✅ Star/bookmark icon for important notes (toggle favorite)
- ✅ Color-coded notes (preset palette)
- ✅ "+ New Note" button (bottom of sidebar)
- ✅ Delete button (trash icon, bottom of sidebar)
- ✅ Search notes by keyword (filters by title and content, case-insensitive)
- ✅ App branding: "DevAI Notes" with emoji icon
- ⏳ Filter by starred/color

### Main Editor Area

- ✅ Textarea for note content
- ✅ Save note button (updates timestamp)
- ✅ Note persistence to localStorage
- ⏳ Editable note titles (inline editing on click)
- ⏳ Auto-save functionality (save as you type)
- ⏳ Rich text formatting toolbar (bold, italic, etc.)
- ⏳ Word/character count
- ⏳ Dark mode toggle (moon icon)

### Right AI assistant panel

- ✅ Chat message display (user + AI)
- ✅ Input field with Enter to send
- ⏳ Real AI responses (Claude API integration)
- ⏳ AI avatar and friendly greeting
- ⏳ Better prompt styling

## Development Tools & Automation

### Hooks

The project uses automated hooks to streamline development:

- **Prettier Auto-format**: Code is automatically formatted on save
- **Notification Hook**: Notifications for important events

See `.claude/settings.json` for hook configuration details.

### Browser Automation (Playwright MCP)

The project includes Playwright MCP for browser automation and testing:

- **Configuration**: `.mcp.json` (stdio-based communication)
- **Package**: `@playwright/mcp` in devDependencies
- **Usage**: Start the dev server (`npm run dev`), then use browser automation tools to test, verify UI changes, and capture screenshots

**What you can do with it:**

- Test user workflows (create a note, add content, save, delete)
- Verify UI interactions work (star a note, change colors, etc.)
- Capture screenshots to visually verify changes
- Test that state changes are reflected in the UI
- Regression testing to ensure existing features still work after changes

The MCP automatically manages its lifecycle — no manual start/stop needed.
