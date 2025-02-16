const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path  : ', request.path)
    console.log('Body  : ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

const cors = require('cors')
app.use(cors())

let notes = [
    {
        id: '1',
        content: "HTML is easy",
        important: true
    },
    {
        id: '2',
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: '3',
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    },
    {
        id: '4',
        content: "Hello World",
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
    notes = notes.filter(note => Number(note.id) !== id)

    response.status(204).end()
})

const generateID = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.put('/api/notes/:id', (request, response) => {
    const id = request.params.id; const body = request.body;
    const note = notes.find(n => n.id === id);
    if (!note) {
        return response.status(404).json({ error: "Note not found" });
    }
    const updatedNote = { ...note, important: body.important };
    notes = notes.map(n => (n.id === id ? updatedNote : n));
    response.json(updatedNote);
});

app.post('/api/notes/', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        id: String(generateID()),
    }
    notes = notes.concat(note)
    response.json(note)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
