const bull = require('bull');
const MailSchema = require('../models/Mail');
const { send } = require('./Mailer');
const queue = new bull('Mail-Queue', 'redis://127.0.0.1:6379');

queue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result ${result}`);
});

queue.process(async (job) => {
    const { id } = job;

    try {
        const mail = await MailSchema.findById(id);
        const { msg, writingDate, deliveryDate, email } = mail; 
        
        await send({ to: email, msg, writingDate, deliveryDate });
        console.log(`Mail sent to ${email}`);

        await mail.updateOne({ isSent: true });
        job.moveToCompleted("done", true);
    } catch(e) {
        job.moveToFailed({message: e});
        throw new Error(e);
    }
});

module.exports = queue;