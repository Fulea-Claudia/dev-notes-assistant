import { useState, useEffect } from 'react'

const initialNotes = [
  { id: 1, title: 'Note no.1', content: 'Welcome to DevNotes AI. Start typing your notes...', updatedAt: new Date().toISOString(), starred: false, color: '#ffffff' },
  { id: 2, title: 'Note no.2', content: '', updatedAt: new Date().toISOString(), starred: false, color: '#ffffff' },
  { id: 3, title: 'Note no.3', content: '', updatedAt: new Date().toISOString(), starred: false, color: '#ffffff' },
]

function formatDate(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    + ' • '
    + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('devnotes-notes')
    return saved ? JSON.parse(saved) : initialNotes
  })

  const [selectedNoteId, setSelectedNoteId] = useState(() => {
    const saved = localStorage.getItem('devnotes-selectedId')
    return saved ? Number(saved) : 1
  })

  const [editorContent, setEditorContent] = useState(() => {
    const savedNotes = localStorage.getItem('devnotes-notes')
    const savedId = localStorage.getItem('devnotes-selectedId')
    const notesList = savedNotes ? JSON.parse(savedNotes) : initialNotes
    const id = savedId ? Number(savedId) : 1
    return notesList.find(n => n.id === id)?.content ?? ''
  })
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hi there! I\'m here to help with your notes.' }
  ])

  useEffect(() => {
    localStorage.setItem('devnotes-notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('devnotes-selectedId', String(selectedNoteId))
  }, [selectedNoteId])

  function handleNoteSelect(note) {
    setSelectedNoteId(note.id)
    setEditorContent(note.content)
  }

  function handleSave() {
    setNotes(notes.map(n =>
      n.id === selectedNoteId ? { ...n, content: editorContent, updatedAt: new Date().toISOString() } : n
    ))
  }

  function handleChatKeyDown(e) {
    if (e.key === 'Enter' && chatInput.trim()) {
      setMessages([...messages, { id: Date.now(), role: 'user', text: chatInput }])
      setChatInput('')
    }
  }

  function handleAddNote() {
    const title = prompt('Note name:') || 'New Note'
    const newNote = { id: Date.now(), title, content: '', updatedAt: new Date().toISOString(), starred: false, color: '#ffffff' }
    setNotes([...notes, newNote])
    setSelectedNoteId(newNote.id)
    setEditorContent('')
  }

  function handleDeleteNote(noteId) {
    const remaining = notes.filter(n => n.id !== noteId)
    setNotes(remaining)
    if (noteId === selectedNoteId) {
      setSelectedNoteId(remaining[0].id)
      setEditorContent(remaining[0].content)
    }
  }

  const PRESET_COLORS = ['#ffffff', '#e8f5e9', '#e3f2fd', '#fff9c4', '#fce4ec']

  function handleToggleStar(noteId) {
    setNotes(notes.map(n =>
      n.id === noteId ? { ...n, starred: !n.starred } : n
    ))
  }

  function handleChangeColor(noteId, color) {
    setNotes(notes.map(n =>
      n.id === noteId ? { ...n, color } : n
    ))
  }

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Notes</h2>
        </div>
        <ul className="notes-list">
          {notes.map(note => (
            <li
              key={note.id}
              className={`note-item ${note.id === selectedNoteId ? 'active' : ''}`}
              style={{ backgroundColor: note.id === selectedNoteId ? '' : note.color }}
              onClick={() => handleNoteSelect(note)}
            >
              <div className="note-item-main">
                <span className="note-title">{note.title}</span>
                <span className="note-date">{formatDate(note.updatedAt)}</span>
              </div>
              <div className="note-item-actions">
                <button
                  className={`star-btn ${note.starred ? 'starred' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleToggleStar(note.id) }}
                >
                  {note.starred ? '★' : '☆'}
                </button>
                <div className="color-swatches">
                  {PRESET_COLORS.map(c => (
                    <button
                      key={c}
                      className="color-swatch"
                      style={{ backgroundColor: c }}
                      onClick={(e) => { e.stopPropagation(); handleChangeColor(note.id, c) }}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <button className="add-note-btn" onClick={handleAddNote}>+ New Note</button>
          {notes.length > 1 && (
            <button className="delete-selected-btn" onClick={() => handleDeleteNote(selectedNoteId)}>🗑</button>
          )}
        </div>
      </aside>

      {/* Main Notes Area */}
      <main className="main-area">
        <h1>DevNotes AI</h1>
        <p>AI-assisted developer notes workspace</p>
        <textarea
          className="notes-editor"
          placeholder="Write your notes here..."
          value={editorContent}
          onChange={(e) => setEditorContent(e.target.value)}
        />
        <button className="save-button" onClick={handleSave}>Save Note</button>
      </main>

      {/* Right AI Assistant Panel */}
      <aside className="ai-panel">
        <h2>AI Assistant</h2>
        <div className="chat-area">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.role === 'ai' ? 'ai-message' : 'user-message'}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="ai-input"
          placeholder="Looking for something? Let's find it..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleChatKeyDown}
        />
      </aside>
    </div>
  )
}

export default App
