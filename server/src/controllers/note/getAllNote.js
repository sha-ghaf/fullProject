const {
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const Note = require('../../helpers/schema/noteSchema.js')

const getAllNotes = async (req, res, next) => {
    try {
        const userId = req.user;
        // Retrieve all notes belonging to the authenticated user
        const note = await Note.find({ userId });
        console.log(note)
        return okResponse(res, 'notes fetched successfully', { note } )
    } catch (error) {
        next(error)
        internalError 
    }
}

module.exports = getAllNotes

