'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm reboot action', function () {
    it('reboot call resolves', function (done) {
        let response = client.reboot();
        response.then(r => {
            expect(client.action).toEqual('devicereboot');
            expect(r.isSuccess()).toBeTruthy();
            done();
        })
    }, 90000);
});