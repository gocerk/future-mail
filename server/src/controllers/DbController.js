const MailSchema = require('../models/Mail');

module.exports = {
    getId: (req, res) => {
        const { msg, email, deliveryDate } = req.body;
        console.log(msg, email, deliveryDate);
        
        try {
            const mail = new MailSchema({
                msg: msg, 
                email: email,
                writingDate: new Date().getTime(),
                deliveryDate: deliveryDate
            });
    
            mail.save((err, mail) => {
                if(err) res.status(500).json({message: 'error', status: 'fail'});
                res.status(200);
                res.json(mail);
            });
        } catch(e) {
            res.status(500).send(e);
        }
       
    }
}