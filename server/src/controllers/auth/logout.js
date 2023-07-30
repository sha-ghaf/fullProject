const User = require('../../helpers/schema/userSchema.js')
const {
    notFoundResponse,
	okResponse,
    conflictResponse
} = require('../../helpers/functions/ResponseHandler.js')


const logout = async ( req, res ) => {
    try{
        const id = req.user
        console.log(id)
        const user = User.findOne({ _id: id })
        console.log(user)
        if(!user){
            return notFoundResponse(res, 'Unable to find user')
        }
        user.tokens = user.tokens.filter((token)=>{
            return token === req.token
        })
        await user.save()
        return okResponse(res, "User logout successfully",{
            username: user.username,
            email: user.email,
            roles: user.roles,
            active: user.active,
            picturePath: user.picturePath
        })
    }
    catch(error){
        return conflictResponse(res, 'ghtyrh')
    }
}

module.exports = logout