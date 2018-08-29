'use strict';

var Uniterm = require('../lib/index');
var { username, password, device } = require('./client');

describe('uniterm client suite', function (done) {
    it('should set the account username and password', function () {
        var client = Uniterm(username, password, device);
        expect(client.username).toBe(username);
        expect(client.password).toBe(password);
        expect(client.device).toBe(device);
        expect(client.location).toBe("https://localhost:8123");
    });

    it('should set custom location', function () {
        var client = Uniterm(username, password, device, {
            location: "https://localhost:8122"
        });
        expect(client.location).toBe("https://localhost:8122");
    });
});