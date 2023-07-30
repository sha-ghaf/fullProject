const {
    notFoundResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const Note = require('../../helpers/schema/noteSchema.js')

const deleteNote = async (req, res, next) => {
    try {
        const _id = req.params.id;
        // console.log(_id)
        // Find the note by ID and ensure it belongs to the authenticated user
        const note = await Note.findOne({ _id })
        // console.log(note)
        if (!note) {
            return notFoundResponse(res, 'Note not found' )
        }
        const result = await note.deleteOne()
        return okResponse(res, 'Note deleted successfully', {
            title: result.title,
            text: result.text
        })
    } catch (error) {
        next(error)
        internalError
    }
};

module.exports = deleteNote