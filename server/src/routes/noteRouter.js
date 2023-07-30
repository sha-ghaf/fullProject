const express = require ('express')
const NoteRouter = express.Router()
const notesController = require('../controllers/note/index.js')
const authenticate = require('../helpers/functions/auth.js')
const checkRoles = require('../helpers/functions/checkRoles.js')

NoteRouter.post('/', authenticate, notesController.addNote)
NoteRouter.get('/', authenticate, notesController.getAllNotes)
NoteRouter.get('/A_M', authenticate, checkRoles(['Manager', 'Admin']), notesController.getAllNotesA_M)
NoteRouter.get('/:id', authenticate, notesController.getNoteById)
NoteRouter.patch('/:id', authenticate, notesController.updateNote)
NoteRouter.delete('/:id', authenticate, checkRoles(['Manager', 'Admin']), notesController.deleteNote)

module.exports = NoteRouter