'use strict';

var _ = require("lodash");
var axios = require('axios');
var https = require('https');
var Builder = require('./Builder');
var Response = require('./Response');

class Uniterm {
    constructor(username, password, device, opts) {
        opts = opts || {};
        var env = opts.env || process.env;

        this.username = username || env.UNITERM_USERNAME;
        this.password = password || env.UNITERM_PASSWORD;
        this.device = device || env.UNITERM_DEVICE;
        this.defaultTimeout = opts.defaultTimeout || 120000;
        this.location = opts.location || "https://localhost:8123";
        this.deviceType = opts.deviceType || "ingenico_rba";
        this.deviceFlags = opts.deviceFlags || "DEVICEONLY";
        this.identifier = opts.identifier || 1;
        this.client = opts.client || this.createcClient();
        this.uniqueId = opts.uniqueId || _.uniqueId();

        if (!this.device) {
            throw new Error('device is required');
        }

        if (!this.username) {
            throw new Error('username is required');
        }

        if (!this.password) {
            throw new Error('password is required');
        }
        
        this.builder = new Builder(this);
    }

    ping(params) {
        this.prepare('ping', params);

        return this.query();
    }

    status(params) {
        this.prepare('status', params);

        return this.query();
    }

    version(params) {
        this.prepare('version', params);

        return this.query();
    }

    reboot(params) {
        this.prepare('devicereboot', params);

        return this.query();
    }

    shutdown(params) {
        this.prepare('shutdown', params);

        return this.query();
    }

    upload(filename, base64Data, params) {
        this.prepare('deviceupload', _.merge({
                                    u_filename: filename, 
                                    u_b64data: base64Data
                                }, params));

        return this.query();
    }

    cancel(id, params) {
        this.prepare('cancel', _.merge({u_id: id}, params));

        return this.query();
    }

    sale(amount, id, params) {
        return this.transInternal('txnrequest', 'sale', amount, id, params);
    }

    transactionStart(id, params) {
        return this.transInternal('txnstart', 'sale', null, id, params);
    }

    transactionFinish(amount, id, params) {
        return this.transInternal('txnfinish', 'sale', amount, id, params);
    }

    preAuth(amount, id, params) {
        return this.transInternal('txnrequest', 'preauth', amount, id, params);
    }

    return(amount, id, params) {
        return this.transInternal('txnrequest', 'return', amount, id, params);
    }

    authComplete(ttid, params) {
        return this.passThrough('force', ttid, params);
    }

    reversal(ttid, params) {
        return this.passThrough('reversal', ttid, params);
    }

    void(ttid, params) {
        return this.passThrough('void', ttid, params);
    }

    passThrough(action, id, params) {
        this.prepare('passthrough', _.merge({
                                    action: action,
                                    ttid: id,
                                }, params));

        return this.query();
    }

    transInternal(action, subAction, amount, id, params) {
        this.prepare(action, _.merge({
                                    action: subAction,
                                    amount: amount,
                                    u_id: id,
                                    nsf: 'yes',
                                    laneid: _.get(params, 'laneid', 1)
                                }, params));

        return this.query();
    }

    info(params) {
        this.prepare('deviceinfo', params);

        return this.query();
    }

    load(params) {
        this.prepare('deviceload', params);

        return this.query();
    }

    signature(params) {
        this.prepare('reqsignature', params);

        return this.query();
    }

    confirm(message, params) {
        this.prepare('reqconfirm', _.merge({u_message: message}, params));

        return this.query();
    }

    input(type, params) {
        this.prepare('reqinput', _.merge({u_inputtype: type}, params));

        return this.query();
    }

    prepare(action, params) {
        this.params = params || {};
        this.action = action;
    }

    createcClient() {
        return axios.create({
            baseURL: this.location,
            timeout: this.defaultTimeout,
            httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
            headers: { 'Content-Type': 'text/xml' },
        });
    }

    async query() {
        let { data } = await this.client.post('', this.xml);

        this.responseXml = data;

        this.response = await new Response(data).parse();

        return this.response;
    }

    get xml() {
        return this.builder.build();
    }

    get responseXml() {
        return this._responseXml;
    }

    set responseXml(xml) {
        this._responseXml = xml;
    }
}

module.exports = Uniterm;