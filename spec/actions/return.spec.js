'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm pre auth action', function () {
    it('device pre auth call resolves', function (done) {
        let response = client.sale(100, 1);
        response.then(result => {
            expect(result.isSuccess()).toBeTruthy();
            expect(client.action).toEqual('txnrequest');
            let returnTransaction = client.return(50, 1);
            returnTransaction.then(result => {
                expect(result.isSuccess()).toBeTruthy();
                expect(client.action).toEqual('txnrequest');
                done()
            });
        });        
    }, 90000);
});