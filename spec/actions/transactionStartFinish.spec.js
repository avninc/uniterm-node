'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm transaction start action', function () {
    it('device transaction start call resolves', function (done) {
        let response = client.transactionStart(100);
        response.then(result => {
            expect(result.isSuccess()).toBeTruthy();
            expect(client.action).toEqual('txnstart');
            let finish = client.transactionFinish(2, 100);
            finish.then(result => {
                expect(result.isSuccess()).toBeTruthy();
                expect(client.action).toEqual('txnfinish');
                done()
            });
        });        
    }, 90000);
});