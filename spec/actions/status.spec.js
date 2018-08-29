'use strict';

var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm status action', function () {
    it('status action was set', function () {
        client.status({u_id: 1});
        expect(client.action).toEqual('status');
    });

    it('status call resolves', function (done) {
        let response = client.status({u_id: 1});
        response.then(r => {
            expect(r.error()).toEqual('UID_NOT_FOUND');
            done();
        })
    }, customTimeout);
});