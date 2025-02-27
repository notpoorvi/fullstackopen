require('dotenv').config()
const express = require('express')
const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path  : ', request.path)
    console.log('Body  : ', request.body)
    console.log('---')
    next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
const Note = require('./models/note')

const cors = require('cors')
app.use(cors())

// handle HTTP GET requests made to the application's root
app.get('/', (request, response) => {
    response.send('<h1>Hello World!<h1/>')
})
// handle HTTP GET requests made to the notes path of the application
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})
// handle HTTP GET requests made to a particular note from application
app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)
        }
        else {
            response.status(404).send({ error: "note not found" }).end()
        }
    }).catch(error => {
        next(error)
    })
})
// handle delete requests
app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id).then(result => {
        if (result) {
            response.status(204).end()
        } else {
            response.status(400).send({ error: "note does not exist" })
        }
    }).catch(error => next(error))
})

app.put('/api/notes/:id', (request, response) => {
    const body = request.body;
    const note = {
        content: body.content,
        important: body.important
    };
    Note.findByIdAndUpdate(request.params.id, note, { new: true }).then(updatedNote => {
        response.json(updatedNote)
    }).catch(error => next(error))
});

app.post('/api/notes/', (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    note.save().then(savedNote => { response.json(savedNote) })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name == 'CastError') {
        return response.status(400).send({ error: "malformatted id" })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
