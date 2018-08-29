'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm ping action', function () {
    it('ping action was set', function () {
        client.ping();
        expect(client.action).toEqual('ping');
    });

    it('ping call resolves', function (done) {
        let response = client.ping();
        response.then(r => {
            expect(r.isSuccess()).toBeTruthy();
            done();
        })
    });
});