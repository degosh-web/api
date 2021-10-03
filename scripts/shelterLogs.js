const { Log } = require('../scripts/logs');
require('dotenv').config({ path: ".env" });
const fetch = require('node-fetch');
const { SH_SPAM, SH_N_KEY, SH_RM_KEY, SH_WRONG_IP, SH_LOGIN_OK, SH_NO_KEY, SH_RESET_IP } = process.env;

class LoggedIn extends Log {
    constructor(key, ip) {
        super();
        this.url = SH_LOGIN_OK;
        this.msg.embeds[0].title = `KEY: ${key}`;
        this.msg.embeds[0].fields = [
            {
                name: "IP",
                value: ip,
                inline: true
            }
        ];
    }
}

class NewKey extends Log {
    constructor(key, id) {
        super();
        this.url = SH_N_KEY;
        this.msg.embeds[0].title = `ID: ${id}`;
        this.msg.embeds[0].fields = [
            {
                name: "Key",
                value: key,
                inline: true
            }
        ];
    }
}

class ResetKey extends Log {
    constructor (id, key) {
        super();
        this.url = SH_RESET_IP;
        this.msg.embeds[0].title = `ID: ${id}`;
        this.msg.embeds[0].fields = [
            {
                name: "Key",
                value: key,
                inline: true
            }
        ];
    }
}

class ErrorNoKey extends Log {
    constructor(key, ip) {
        super();
        this.url = SH_NO_KEY;
        this.msg.embeds[0].title = `KEY: ${key}`;
        this.msg.embeds[0].fields = [
            {
                name: "IP",
                value: ip,
                inline: true
            }
        ];
    }
}

class ErrorWrongIP extends Log {
    constructor(key, ip) {
        super();
        this.url = SH_WRONG_IP;
        this.msg.embeds[0].title = `KEY: ${key}`;
        this.msg.embeds[0].fields = [
            {
                name: "IP",
                value: ip,
                inline: true
            }
        ];
    }
}

class RemovedKey extends Log {
    constructor(id, reason) {
        super();
        this.url = SH_RM_KEY;
        this.msg.embeds[0].title = `ID: ${id}`;
        this.msg.embeds[0].fields = [
            {
                name: "Reason",
                value: reason,
                inline: true
            }
        ];
    }
}

module.exports = { LoggedIn, NewKey, ResetKey, ErrorNoKey, ErrorWrongIP, RemovedKey };