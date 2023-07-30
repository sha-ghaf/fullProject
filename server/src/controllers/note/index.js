const addNote = require('./addNote.js')
const getAllNotes = require('./getAllNote.js')
const getAllNotesA_M = require('./getAllNotForA&M.js')
const getNoteById = require('./getNoteById.js')
const updateNote = require('./updateNote.js')
const deleteNote = require('./deleteNote.js')

module.exports = {
    addNote,
    getAllNotes, 
    getAllNotesA_M,
    getNoteById,
    updateNote,
    deleteNote,
}