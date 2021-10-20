require('dotenv').config({ path: ".env" });
const fetch = require('node-fetch');
const { DSHOOK_SPAM, DSHOOK_N_KEY, DSHOOK_RM_KEY, DSHOOK_WRONG_IP, DSHOOK_LOGIN_OK, DSHOOK_NO_KEY, DSHOOK_RESET_IP } = process.env;

class Log {
    url = DSHOOK_SPAM;

    msg = {
        "username": "Backend logs",
        "avatar_url": "https://degosh.com/imgs/logo3D.png",
        "embeds": [
            {
                "title": '',
                "description": ``,
                "color": '9987839',
                "fields": [],
                "thumbnail": {},
                "footer": {
                    text: '© DEGOSH 2021, ready to cook',
                },
                "timestamp": new Date()
            },
        ]
    };

    send() {
        fetch(this.url + "?wait=true",
            {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(this.msg)
            });
    }
}

class LoggedIn extends Log {
    constructor(key, ip) {
        super();
        this.url = DSHOOK_LOGIN_OK;
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
        this.url = DSHOOK_N_KEY;
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
        this.url = DSHOOK_RESET_IP;
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
        this.url = DSHOOK_NO_KEY;
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
        this.url = DSHOOK_WRONG_IP;
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
        this.url = DSHOOK_RM_KEY;
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

module.exports = { Log, LoggedIn, NewKey, ResetKey, ErrorNoKey, ErrorWrongIP, RemovedKey };