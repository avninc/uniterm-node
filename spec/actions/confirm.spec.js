'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm confirm action', function () {
    it('device confirm call resolves', function (done) {
        let response = client.confirm('Are you sure you would like to cancel?');
        response.then(r => {
            expect(r.isSuccess()).toBeTruthy();
            expect(r.isConfirmed()).toBeTruthy();
            expect(client.action).toEqual('reqconfirm');
            done();
        })
    }, customTimeout);
});