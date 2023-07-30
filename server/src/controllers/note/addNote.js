const {
	conflictResponse,
    badRequestResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const Note = require('../../helpers/schema/noteSchema.js')
const User = require('../../helpers/schema/userSchema.js')

const addNote =  async( req , res , next) => {
    try{
        if (!req.body.title || !req.body.text) {
            return badRequestResponse(res ,'All fields are required' )
        }
        const title = req.body.title
        const duplicateNote = await Note.findOne({ title });
        if (duplicateNote) {
            return conflictResponse(res, 'Duplicate note title') 
        }
        const _id = req.user
        const newUser = await User.findOne({_id})
        console.log(req.body)
        const newNote = new Note ({
            title: req.body.title,
            text: req.body.text,
            userId: req.user,
            userName: newUser.username ,
            completed: req.body.completed,
            userPicturePath: newUser.picturePath
        })
        await newNote.save()
        return okResponse(res, 'success to create Note',{
            title: newNote.title,
            text: newNote.text,
            UserName: newUser.username ,
            completed: newNote.completed,
            userPicturePath: newUser.picturePath
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = addNote
