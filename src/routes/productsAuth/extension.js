require('dotenv').config({ path: ".env" });
const { LoggedIn, NewKey, ResetKey, ErrorNoKey, ErrorWrongIP, RemovedKey } = require('../../scripts/logs');
const express = require('express');
const extension = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const { DB_LOGIN, DB_PASSWORD, DB_ADDRESS, DB_PORT } = process.env;
const databaseUrl = `mongodb://${DB_LOGIN}:${DB_PASSWORD}@${DB_ADDRESS}:${DB_PORT}/`;
const genKey = require('../../scripts/generateKeyAlgorithm');

extension.use(express.urlencoded({ extended: true }));

module.exports = extension;

extension.post('/extension/findkey', (req, res) => {
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;

        var dbo = db.db("degosh");
        var query = { discordID: req.body.discordID };
        var license = "";

        try {
            dbo.collection("betakeys").findOne(query, function (err, result) {
                if (err) throw err;

                if (result != null) {
                    license = result.key;
                } else {
                    let profile = {
                        discordID: req.body.discordID,
                        key: genKey(),
                        IP: ""
                    }

                    license = profile.key;

                    try {
                        dbo.collection("betakeys").insertOne(profile, function (err, res) {
                            if (err) throw err;
                            new NewKey(profile.key, profile.discordID).send();                            ;
                        });
                    } catch (err) {
                        db.close();
                    }
                }
            });
        } catch (err) {
            db.close();
        } finally {
            setTimeout(() => {
                res.status(200);
                res.json({ key: license });
                db.close();
            }, 500)
        }
    });
});

extension.post('/extension/resetkey', (req, res) => {
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;

        var dbo = db.db("degosh");
        var query = { discordID: req.body.discordID };
        var ans = 'No paired key to your account. Send "!key" firstly.';

        try {
            dbo.collection("betakeys").findOne(query, function (err, result) {
                if (err) throw err;

                if (result != null) {
                    ans = `Now you can use your license key on another IP`;
                    let profile = {
                        discordID: req.body.discordID,
                        key: result.key,
                        IP: ""
                    }

                    new ResetKey(profile.discordID, profile.key).send();

                    dbo.collection("betakeys").updateOne(query, { $set: profile }, function (err, res) {
                        if (err) throw err;
                    });
                }
            });
        } catch (err) {
            db.close();
        } finally {
            setTimeout(() => {
                res.status(200);
                res.json({ answer: ans });
                db.close();
            }, 500)
        }
    });
});

extension.post('/extension/removekey', (req, res) => {
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;

        var dbo = db.db("degosh");
        let query = { discordID: req.body.discordID };

        dbo.collection("betakeys").deleteOne(query, function (err, obj) {
            if (err) throw err;

            if (obj.deletedCount) {
                res.status(200);
                res.json({ status: "ok" });
                new RemovedKey(req.body.discordID, req.body.reason || "No reason").send();
            } else {
                res.status(200);
                res.json({ status: "No paired key to this Discord ID" })
            };

            db.close();
        });
    });
});

extension.post('/extension/enter', (req, res) => {
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("degosh");
        var query = { key: req.body.key };

        dbo.collection("betakeys").findOne(query, function (err, result) {
            if (err) throw err;

            if (result) {
                if (result.IP == req.ip) {
                    res.status(200);
                    res.json({ giveAccess: "Correct" });
                    new LoggedIn(req.body.key, req.ip).send();
                } else if (result.IP == "") {
                    let profile = {
                        discordID: result.discordID,
                        key: result.key,
                        IP: req.ip
                    }

                    dbo.collection("betakeys").updateOne(query, { $set: profile }, function (err, res) {
                        if (err) throw err;
                    });

                    res.status(200);
                    res.json({ giveAccess: "Correct" });
                    new LoggedIn(req.body.key, req.ip).send();
                } else {
                    res.status(200);
                    res.json({ giveAccess: "Wrong IP" });
                    new ErrorWrongIP(req.body.key, req.ip).send();
                }
            } else {
                res.status(200);
                res.json({ giveAccess: "No key" });
                new ErrorNoKey(req.body.key, req.ip).send();
            }

            setTimeout(() => {
                db.close();
            }, 500)
        });
    });
});