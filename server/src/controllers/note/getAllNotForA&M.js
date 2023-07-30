const {
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const Note = require('../../helpers/schema/noteSchema.js')

const getAllNotes = async (req, res, next) => {
    try {
        const note = await Note.find({});
        // console.log(note)
        return okResponse(res, 'notes fetched successfully', { note } )
    } catch (error) {
        next(error)
        internalError 
    }
}

module.exports = getAllNotes