const mongoose = require('mongoose');

const MailSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true 
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    isSent: {
        type: Boolean,
        default: false
    },
    
    writingDate: {
        type: Date,
        required: true
    },

    deliveryDate: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('FutureMail', MailSchema);