const express = require('express')
const app = express()
app.use(express.json())

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]
// handle HTTP GET requests made to the application's root
app.get('/', (request, response) => {
    response.send('<h1>Hello World!<h1/>')
})
// handle HTTP GET requests made to the notes path of the application
app.get('/api/notes', (request, response) => {
    response.json(notes)
})
// handle HTTP GET requests made to a particular note from application
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).json({
            // incase id is not valid
            error: "Note not found"
        }).end()
    }
})

// handle delete requests
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateID = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateID(),
    }
    notes = notes.concat(note)
    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
