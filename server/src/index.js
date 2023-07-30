const express = require ('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const DBConnection = require('./helpers/db/mongoose.js')
const session = require('express-session')
const cors = require ('cors')
const helmet = require('helmet')
const multer = require('multer')
const { fileURLToPath } = require('url')
const morgan = require('morgan')
const UsersController = require('./controllers/user/index.js')
const noteRouter = require('./routes/noteRouter.js')
const userRouter = require('./routes/userRouter.js')
const authRouter = require('./routes/authRouter.js')
const mongoose  = require('mongoose')
const {logger , logEvents} = require('./helpers/middleware/logger.js')
const errorHandler = require('./helpers/middleware/errorHandler.js')
const corsOptions = require('./helpers/db/corsOptions')

const app = express()
DBConnection()
// app.use(cookieParser())
//app.use(cors(corsOptions))
// app.use(cors())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan( "common" ));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
// function in middleWare 
app.use(logger)
app.use(express.json())
// file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage })


// ROUTES WITH FILES 
app.post('/user/register', upload.single("picture"), UsersController.addUser)

// Routers
app.use('/note', noteRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

// for hbs
app.set('view engine', 'hbs');
const viewsDirectory = path.join (__dirname , "../views" )
app.set( "views" , viewsDirectory)
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

// app.use('/', require('./routes/root.js'))
app.all('*' , (req, res) => {
    // res.status(404).send('Sorry this page isn,t fined');
    res.status(404)
    if (req.accepts('html')) {
        res.render("error" , {
        title:"Sorry!",
        paragraph:"The resources you have request doesn't exit"
    })
    } else if (req.accepts('json')) {
        res.send({message : 'page not found'})
    } else {
        res.type('text').send({message : 'page not found'})
    }
});

app.use(errorHandler)

mongoose.connection.on('error', err => {
    console.log("connected to DB")
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})


const port = process.env.PORT || 5000
app.listen( port , () => {
    console.log(`listen to port ${port}`)
})

// app.get("/" , (req , res) => {
//     res.render("index" , {
//         title:"TechNotes",
//     })
// })

