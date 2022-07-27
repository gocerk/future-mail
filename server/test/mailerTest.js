const test = require('node:test');
const assert = require('assert');

const { send } = require('../src/service/Mailer');


test('sending mail test', async () => {
    const response = send({to: 'XXX@gmail.com', msg: 'test', 'deliveryDate': new Date('2022-12-05'), 'writingDate': new Date('2022-5-08')});
    
    assert.strictEqual(response, true);    
});
