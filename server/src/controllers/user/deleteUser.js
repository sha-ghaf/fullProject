const {
	notFoundResponse,
    badRequestResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const User = require('../../helpers/schema/userSchema.js')
const Note = require('../../helpers/schema/noteSchema.js')

const deleteUser = async(req,res)=>{
    try{
        const _id = req.params.id
        //console.log(_id)
        const note = await Note.findOne({ userId: _id })
        //console.log(note)
        if (note) {
            return badRequestResponse(res, 'User has assigned notes' )
        }
        const user = await User.findOneAndDelete({ _id })
        console.log(user)
        if(!user){
            return notFoundResponse( res, 'Unable to find user')
        }
        return okResponse(res, "User deleted successfully")
    }
    catch(error){
        internalError
    }
}

module.exports = deleteUser
