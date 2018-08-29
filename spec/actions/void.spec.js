'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm void action', function () {
    it('device void call resolves', function (done) {
        let response = client.sale(100, 1);
        response.then(result => {
            expect(result.isSuccess()).toBeTruthy();
            expect(client.action).toEqual('txnrequest');
            let voidTransaction = client.void(result.ttid());
            voidTransaction.then(result => {
                expect(result.isSuccess()).toBeTruthy();
                expect(client.action).toEqual('passthrough');
                done()
            });
        });        
    }, 90000);
});