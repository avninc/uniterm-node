'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm input action', function () {
    it('device input call resolves', function (done) {
        let response = client.input('PHONENUM');
        response.then(r => {
            expect(r.isSuccess()).toBeTruthy();
            expect(r.input()).not.toBeNull();
            expect(client.action).toEqual('reqinput');
            done();
        })
    }, customTimeout);
});