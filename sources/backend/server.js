"use strict";

const
    express = require("express"),
    fs = require("fs"),
    path = require("path"),
    url = require("url"),
    marked = require("marked"),
    cheerio = require("cheerio"),
    multiparty = require("connect-multiparty");

const
    port = process.env.npm_package_config_port,
    frontendPath = path.resolve("sources/frontend"),
    archivePath = path.resolve("problems"),
    markedPath = path.resolve("node_modules/marked/marked.min.js");

const
    app = express(),
    middleware = multiparty();

app.get(/display.html/, (request, response) => {
    let name = url.parse(request.url, true).query.problem;
    Promise.all([
        new Promise((resolve, reject) => {
            fs.readFile(path.join(archivePath, name, "description.md"), (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data.toString());
                }
            });
        }), new Promise((resolve, reject) => {
            fs.readFile(path.join(frontendPath, "display.html"), (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data.toString());
                }
            });
        })
    ]).then((values) => {
        let md = values[0];
        let html = values[1];
        let $ = cheerio.load(html);
        $("#description").text(md);
        response.send($.html());
        response.end();
    });
});

app.get(/.*\.html/, (request, response) => {
    response.type("html");
    fs.readFile(frontendPath + request.url, {}, (error, data) => {
        if (error) {
            response.send(error);
        } else {
            response.send(data);
        }
        response.end();
    });
});

app.get(/archive/, (request, response) => {
    response.type("json");
    fs.readdir(archivePath, (error, data) => {
        response.send(data);
        response.end();
    });
});

app.get(/marked.js/, (request, response) => {
    fs.readFile(markedPath, (error, data) => {
        response.send(data.toString());
        response.end();
    });
});

app.post("/submitCode", middleware, (request, response) => {
    console.log("Your code:");
    console.log(request.body.code);
    response.end("Submited successfully!");
});

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
    console.log("sql-judger is running on http://localhost:" + port);
    console.log("Visit http://127.0.0.1:8080/index.html for a trial!");
});
