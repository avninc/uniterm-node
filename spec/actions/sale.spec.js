'use strict';

var uuid = require('uuid/v1');
var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm sale action', function () {
    it('device sale call resolves', function (done) {
        let response = client.sale(3, uuid());
        response.then(result => {
            expect(result.isSuccess()).toBeTruthy();
            expect(result.account()).not.toBeNull();
            expect(client.action).toEqual('txnrequest');
            done()
        });        
    }, 90000);
});