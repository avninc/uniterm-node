'use strict';

var _ = require("lodash");
var xmlBuilder = require('xmlbuilder');

class Builder
{
    constructor(uniterm) {
        this.uniterm = uniterm;
    }

    build() {
        let root = xmlBuilder.create('MonetraTrans');

        var trans = root.ele('Trans', {identifier: this.uniterm.identifier})
            .ele('username', this.uniterm.username).up()
            .ele('password', this.uniterm.password).up()
            .ele('u_action', this.uniterm.action).up()
            .ele('u_device', this.uniterm.device).up()
            .ele('u_devicetype', this.uniterm.deviceType).up()
            .ele('u_flags', this.uniterm.deviceFlags).up();

        _.each(this.uniterm.params, (value, key) => {
            trans.ele(key, value).up();
        });

        this.xml = root.doc().end({ pretty: true});
        
        return this.xml;
    }
}

module.exports = Builder;