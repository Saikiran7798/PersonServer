const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "phone": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "phone": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "phone": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "phone": "39-23-6423122"
    }
]

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.get("/api/persons", (req, res) => {
    res.json(notes)
})

app.get("/info", (req,res) => {
    const currentDate = new Date();
    const msg = `<p>Phonebook has info of ${notes.length} people</p>
    <p> ${currentDate.toString()} `
    res.send(msg)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const note = notes.find(n => n.id === id)
    if(note){
        res.send(note)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    notes = notes.filter((n) => n.id !== id)
    res.status(204).end()
})

app.post('/api/persons/add', (req,res) => {
    const body = req.body
    if(!body.name){
        return res.status(400).json({
            error: "Name is missing"
        })
    }
    if(!body.phone){
        return res.status(400).json({
            error: "Number is missing"
        })
    }
    let isName = false
    notes.forEach((element) => {
        if(element.name.toLowerCase() === body.name.toLowerCase()){
            isName = true
        }
    })
    if(isName){
        return res.status(400).json({
            error: "Name already in notes"
        })
    }
    const note = {
        id: Math.floor(Math.random() * 10000),
        name : body.name,
        phone: body.phone
    }
    console.log(body)
    notes = notes.concat(note)
    res.send(note)
})

app.listen(3001)