const {
    notFoundResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const Note = require('../../helpers/schema/noteSchema.js')

const getNoteById = async( req, res, next)=>{
    try{
        const _id = req.params.id
        const note = await Note.findOne({ _id })
        if(!note){
            return  notFoundResponse(res, 'There is no notes for you with this id')
        }
        return okResponse(res, 'User fetched successfully', {
            // title: note.title,
            // text: note.text,
            // UserName: note.userName ,
            // completed: note.completed,
            // userPicturePath: note.userPicturePath
            note
        })
    }
    catch(error){
        internalError
    }
}

module.exports = getNoteById