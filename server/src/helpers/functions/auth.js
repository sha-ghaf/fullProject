const jwt = require('jsonwebtoken')
const {
	unAuthorizedResponse,
} = require('../../helpers/functions/ResponseHandler.js')

const authenticate = async( req, res, next ) => {
    try{
        // const token = req.cookies.access_token;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return next(unAuthorizedResponse(res, 'Unauthorized' ));
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return next(unAuthorizedResponse(res, 'Invalid Token' ));
            }
            console.log(token)
            req.user = decoded.userId;
            req.token = token
            // console.log(decoded)
            // console.log(req.user)
            return next();
        });
    }
    catch(error){
        unAuthorizedResponse(res, 'Please authenticate')
    }
}
//Orange1234*
module.exports = authenticate
