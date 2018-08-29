'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm pre auth action', function () {
    it('device pre auth call resolves', function (done) {
        let response = client.preAuth(100, 1);
        response.then(result => {
            expect(result.isSuccess()).toBeTruthy();
            expect(client.action).toEqual('txnrequest');
            let complete = client.authComplete(result.ttid());
            complete.then(result => {
                expect(result.isSuccess()).toBeTruthy();
                expect(client.action).toEqual('passthrough');
                done()
            });
        });        
    }, 90000);
});