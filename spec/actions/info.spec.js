'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm info action', function () {
    it('device info call resolves', function (done) {
        let response = client.info();
        response.then(r => {
            expect(r.isSuccess()).toBeTruthy();
            expect(client.action).toEqual('deviceinfo');
            done();
        })
    }, customTimeout);
});