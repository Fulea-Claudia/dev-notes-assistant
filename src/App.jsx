import { useState } from 'react'

function App() {

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h2>Notes</h2>
        <ul className="notes-list">
          <li className="note-item active">Note no.1</li>
          <li className="note-item">Note no.2</li>
          <li className="note-item">Note no.3</li>
        </ul>
      </aside>

      {/* Main Notes Area */}
      <main className="main-area">
        <h1>DevNotes AI</h1>
        <p>AI-assisted developer notes workspace</p>
        <textarea
          className="notes-editor"
          placeholder="Write your notes here..."
          defaultValue="Welcome to DevNotes AI. Start typing your notes..."
        />
      </main>

      {/* Right AI Assistant Panel */}
      <aside className="ai-panel">
        <h2>AI Assistant</h2>
        <div className="chat-area">
          <div className="message ai-message">
            <p>Hi there! I'm here to help with your notes.</p>
          </div>
        </div>
        <input
          type="text"
          className="ai-input"
          placeholder="Looking for something? Let's find it..."
        />
      </aside>
    </div>
  )
}

export default App
