"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const Factory_1 = require("./lib/Factory");
const api_1 = require("./routes/api");
const setupServer = () => {
    const SERVER_PORT = process.env.MONGOKU_SERVER_PORT || 3200;
    app.get('/', (req, res, next) => {
        res.sendFile("app/index.html", { root: __dirname }, (err) => {
            if (err) {
                return next(err);
            }
        });
    });
    app.use('/api', api_1.api);
    app.get('/*', (req, res, next) => {
        const ext = path.extname(req.url);
        fs.stat(path.join(__dirname, "app", req.url), (err, stats) => {
            let file = "index.html";
            if (stats && stats.isFile()) {
                file = req.url;
            }
            res.sendFile(file, { root: path.join(__dirname, "app") }, (err) => {
                if (err) {
                    return next(err);
                }
            });
        });
    });
    app.use((err, req, res, next) => {
        res.status(500);
        return res.json({
            ok: false,
            message: err.message
        });
    });
    app.listen(SERVER_PORT, () => console.log(`[Mongoku] listening on port ` + SERVER_PORT));
};
exports.start = async () => {
    console.log(`[Mongoku] Starting...`);
    try {
        await Factory_1.default.load();
        setupServer();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
if (require.main === module) {
    (async () => {
        await exports.start();
    })();
}
