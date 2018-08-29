'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm load action', function () {
    it('device load call resolves', function (done) {
        let response = client.load();
        response.then(r => {
            expect(r.isSuccess()).toBeTruthy();
            expect(client.action).toEqual('deviceload');
            done();
        })
    }, customTimeout);
});