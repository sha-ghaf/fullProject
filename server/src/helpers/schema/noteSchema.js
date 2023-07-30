const mongoose = require ('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        text:{
            type: String,
            required: true,
            trim: true
        },
        completed:{
            type: Boolean,
            default: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        userPicturePath: String,
        userName: {
            type: String,
            required: true,
            trim: true
        },
        UpdatedUserName: {
            type: [],
            trim: true
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 1
})

module.exports = mongoose.model('Note', noteSchema)