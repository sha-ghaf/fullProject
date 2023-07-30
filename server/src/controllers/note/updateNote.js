const {
    notFoundResponse,
	okResponse,
    badRequestResponse,
    conflictResponse
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const Note = require('../../helpers/schema/noteSchema.js')
const User = require('../../helpers/schema/userSchema.js')

const updateNote = async ( req, res, next ) => {
    try {
        const  _id  = req.params.id;
        console.log(req.body)
        const userId = req.user
        const { title, text, completed } = req.body
        if (!_id || !title || !text || !completed) {
            return badRequestResponse(res ,'All fields are required' )
        }
        // Find the note by ID and ensure it belongs to the authenticated user
        const note = await Note.findOne({ _id });
        if (!note) {
            return notFoundResponse(res, 'Note not found' );
        }
        const newUser = await User.findOne({ _id: userId })
        console.log(newUser)
        // Update the note
        note.title = title;
        note.text = text;
        note.completed = completed;
        note.userId = note.userId
        note.userName = note.userName
        note.UpdatedUserName = note.UpdatedUserName.concat(newUser.username)
        note.userPicturePath = note.userPicturePath
        await note.save();
        console.log(note);
        return okResponse(res, 'Note updated successfully', {
            title: note.title,
            text: note.text,
            completed: note.completed,
            userPicturePath: note.userPicturePath,
            userName: note.userName,
            UpdatedUserName: note.UpdatedUserName
        });
    } catch (error) {
        internalError
        next(error)
    }
};

module.exports = updateNote