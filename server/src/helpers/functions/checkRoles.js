const {
    notFoundResponse,
	unAuthorizedResponse,
} = require('./ResponseHandler.js')
const User = require('../schema/userSchema.js')

const checkRoles = (roles) => {
    return (req, res, next) => {
        const userId = req.user;
        // Retrieve the user from the database
        //console.log(userId)
        User.findById( userId, (err, user) => {
            if (err || !user) {
            return notFoundResponse(res , 'User not found' );
            }
            // console.log(user)
            // console.log(roles);
            console.log(user.roles)
            // Check if the user has the required role
            if (!roles.includes(user.roles)) {
            return unAuthorizedResponse(res, 'Unauthorized')
            }
            next(); 
        });
    };
};

module.exports = checkRoles