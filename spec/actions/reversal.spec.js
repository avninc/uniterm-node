'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm reversal action', function () {
    it('device reversal call resolves', function (done) {
        let response = client.sale(100, 1);
        response.then(result => {
            expect(result.isSuccess()).toBeTruthy();
            expect(client.action).toEqual('txnrequest');
            let reversal = client.reversal(result.ttid());
            reversal.then(result => {
                expect(result.isSuccess()).toBeTruthy();
                expect(client.action).toEqual('passthrough');
                done()
            });
        });        
    }, 90000);
});