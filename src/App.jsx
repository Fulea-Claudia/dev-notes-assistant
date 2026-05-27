import { useState, useEffect } from 'react'

const initialNotes = [
  { id: 1, title: 'Note no.1', content: 'Welcome to DevNotes AI. Start typing your notes...' },
  { id: 2, title: 'Note no.2', content: '' },
  { id: 3, title: 'Note no.3', content: '' },
]

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
      n.id === selectedNoteId ? { ...n, content: editorContent } : n
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
    const newNote = { id: Date.now(), title, content: '' }
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

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Notes</h2>
          <button className="add-note-btn" onClick={handleAddNote}>+</button>
        </div>
        <ul className="notes-list">
          {notes.map(note => (
            <li
              key={note.id}
              className={`note-item ${note.id === selectedNoteId ? 'active' : ''}`}
              onClick={() => handleNoteSelect(note)}
            >
              <span>{note.title}</span>
              {notes.length > 1 && (
                <button
                  className="delete-note-btn"
                  onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id) }}
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
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
