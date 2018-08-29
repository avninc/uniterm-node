'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm version action', function () {
    it('version action was set', function () {
        client.version();
        expect(client.action).toEqual('version');
    });

    it('version call resolves', function (done) {
        let response = client.version();
        response.then(r => {
            expect(r.isSuccess()).toBeTruthy();
            done();
        })
    }, customTimeout);
});