'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm signature action', function () {
    it('device signature call resolves', function (done) {
        let response = client.signature();
        response.then(r => {
            expect(r.isSuccess()).toBeTruthy();
            expect(r.signature()).not.toBeNull();
            expect(client.action).toEqual('reqsignature');
            done();
        })
    }, customTimeout);
});