const bull = require('bull');
const Queue = require('../service/Queue');


module.exports = {
    redirectHandler: (req, res) => { // for the get request to /queue 
        res.json({message: 'please send a POST request to this endpoint', status: 'success'})
    },

    addToQueue: async (req, res) => {
        const { deliveryDate, writingDate,  msgId } = req.body;
        console.log(deliveryDate, writingDate, msgId);
        const deliveryTimeMs = new Date(deliveryDate).getTime() - new Date(writingDate).getTime() + '3.6e+6';

        let queue;
        try {
            queue = await Queue.add({msgId}, {delay: deliveryTimeMs});
            res.status(200).json({queueData: queue});
        } catch(e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}