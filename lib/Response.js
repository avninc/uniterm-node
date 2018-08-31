'use strict';
var parser = require('xml2json');
var _ = require("lodash");

class Response {
    constructor(xml) {
        this.xml = xml;
    }

    async parse() {
        this.response = await parser.toJson(this.xml, {object: true, trim: true, coerce: true});

        return this;
    }

    verbiage() {
        return _.get(this.monetraResponse, 'verbiage');
    }

    error() {
        return _.get(this.monetraResponse, 'u_errorcode');
    }

    isPending() {
        return this.error() == 'PENDING_TRAN';
    }

    version() {
        return _.get(this.monetraResponse, 'u_version');
    }

    serialNumber() {
        return _.get(this.monetraResponse, 'serialnum');
    }

    device() {
        return {
            'app': _.get(this.monetraResponse, 'device_app'),
            'appver': _.get(this.monetraResponse, 'device_appver'),
            'encryption': _.get(this.monetraResponse, 'device_encryption'),
            'kernver': _.get(this.monetraResponse, 'device_kernver'),
            'manuf': _.get(this.monetraResponse, 'device_manuf'),
            'manuf_sn': _.get(this.monetraResponse, 'device_manuf_sn'),
            'model': _.get(this.monetraResponse, 'device_model'),
            'serialnum': _.get(this.monetraResponse, 'serialnum'),
        };
    }

    isConfirmed() {
        return _.get(this.monetraResponse, 'u_confirmed') === 'yes';
    }

    input() {
        return _.get(this.monetraResponse, 'u_input');
    }

    id() {
        return _.get(this.monetraResponse, 'u_id');
    }

    signature() {
        return _.get(this.monetraResponse, 'u_signature');
    }

    identifier() {
        return _.get(this.monetraResponse, 'identifier');
    }

    isSuccess() {
        return _.get(this.monetraResponse, 'u_errorcode') == 'SUCCESS';
    }

    isError() {
        return !this.isSuccess();
    }

    account() {
        return _.get(this.monetraResponse, 'account'); 
    }

    auth() {
        return _.get(this.monetraResponse, 'auth'); 
    }

    batch() {
        return _.get(this.monetraResponse, 'batch'); 
    }

    cardHolderName() {
        return _.get(this.monetraResponse, 'cardholdername'); 
    }

    cardtype() {
        return _.get(this.monetraResponse, 'cardtype'); 
    }

    code() {
        return _.get(this.monetraResponse, 'code'); 
    }

    item() {
        return _.get(this.monetraResponse, 'item'); 
    }

    merchant() {
        return {
            'address1': _.get(this.monetraResponse, 'merch_addr1'),
            'address2': _.get(this.monetraResponse, 'merch_addr2'),
            'address3': _.get(this.monetraResponse, 'merch_addr3'),
            'email': _.get(this.monetraResponse, 'merch_email'),
            'name': _.get(this.monetraResponse, 'merch_name'),
            'phone': _.get(this.monetraResponse, 'merch_phone'),
            'url': _.get(this.monetraResponse, 'merch_url'),
            'processor': _.get(this.monetraResponse, 'merch_proc'),
        };
    }

    softCode() {
        return _.get(this.monetraResponse, 'msoft_code'); 
    }

    /**
     *  Indicates how the card data was captured. 
     *  Possible values are:
     *   • G: Keyed entry (EMV Fallback)
     *   • M: Keyed entry
     *   • T: EMV Contactless
     *   • C: EMV Contact
     *   • F: Swipe (EMV Fallback)
     *   • R: MSD (RFID) Contactless
     *   • S: Swipe
     *   • I: MICR Check Read
     */
    entryMode() {
        return _.get(this.monetraResponse, 'rcpt_entry_mode'); 
    }

    ts() {
        return _.get(this.monetraResponse, 'rcpt_host_ts'); 
    }

    ttid() {
        return _.get(this.monetraResponse, 'ttid'); 
    }

    cardClass() {
        return _.get(this.monetraResponse, 'u_cardclass'); 
    }

    flowFlags() {
        return _.get(this.monetraResponse, 'u_flowflags'); 
    }

    set response(response) {
        this._response = response;
    }

    get response() {
        return this._response;
    }

    set xml(xml) {
        this._xml = xml;
    }

    get xml() {
        return this._xml;
    }

    get monetraResponse() {
        return _.get(this.response, 'MonetraResp.Resp')
    }
}

module.exports = Response;