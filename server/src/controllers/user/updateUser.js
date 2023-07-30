const {
	conflictResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const User = require('../../helpers/schema/userSchema.js')
const bcryptjs = require('bcrypt')

const updateUser = async( req, res, next ) => {
    try{
        const _id = req.params.id
        //console.log(_id)
        const user = await User.findOne({ _id });
        //console.log(user)
        if (!user) {
            return conflictResponse(res, 'id not found');
        }
        const roles = req.body.roles
        console.log(typeof roles)
        if (roles.toString() !== "Employee" && roles.toString() !== "Admin" && roles.toString() !== "Manager"){
            return  conflictResponse(res, 'user should be Admin or Employee or Manager')
        }
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
            user.username = req.body.username,
            user.email = req.body.email,
            user.roles = req.body.roles,
            user.password = hashedPassword,
            user.active = req.body.active,
            user.picturePath = req.body.picturePath
            user.ifUserUpdated = true
        await user.save();
        return okResponse(res, 'success to update user',{
            username: user.username,
            email: user.email,
            roles: user.roles,
            active: user.active,
            picturePath:user.picturePath,
            ifUserUpdated: user.ifUserUpdated
        })
    }catch(error){
        next(error)
    }
}

module.exports = updateUser
