'use strict';

var request = require('request').defaults({ encoding: null });
var sharp = require('sharp');
var Uniterm = require('../../lib/index');
var { username, password, device, customTimeout } = require('../client');
var client = Uniterm(username, password, device);

describe('uniterm upload action', function () {
    it('can upload a file', async function(done) {
        request.get('https://picsum.photos/800/400/?random&gravity=center', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                sharp(body)
                    .png()
                    .toBuffer()
                    .then(data => {
                        let response = client.upload('UTAD.PNG', new Buffer(data).toString('base64'));
                        response
                        .then(r => {
                            expect(r.isSuccess()).toBeTruthy();
                            expect(client.action).toEqual('deviceupload');
                            done();
                        })
                        .catch(err => {
                            console.log('Error: ' + err);
                            done();
                        });
                    })
                    .catch(err => {
                        console.log('Error: ' + err);
                        done();
                    });
                
            }
        });
      }, customTimeout);
});