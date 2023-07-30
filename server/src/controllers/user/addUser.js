const {
	conflictResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const User = require('../../helpers/schema/userSchema.js')
const bcryptjs = require('bcrypt')

const addUser =  async( req , res , next) => {
    try{
        //console.log(req.body)
        const email = req.body.email
        //console.log(email)
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return internalError;
            }
            if (user) {
                return conflictResponse(res, 'Email already exists');
            }
        });
        const roles = req.body.roles
        console.log(typeof roles)
        if (roles.toString() !== "Employee" && roles.toString() !== "Admin" && roles.toString() !== "Manager"){
            return  conflictResponse(res, 'user should be Admin or Employee or Manager')
        }
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            roles: req.body.roles,
            password: hashedPassword,
            active: req.body.active,
            picturePath:req.body.picturePath
        })
        await newUser.save()
        return okResponse(res, 'success to create user',{
            username: newUser.username,
            email: newUser.email,
            roles: newUser.roles,
            active: newUser.active,
            picturePath: newUser.picturePath
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = addUser
