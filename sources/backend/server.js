"use strict";

const
    express = require("express"),
    fs = require("fs"),
    path = require("path");

const
    port = process.env.npm_package_config_port,
    frontendPath = path.resolve("sources/frontend");

const app = express();

app.get("/*.html", (request, response) => {
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

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
    console.log("sql-judger is running on http://localhost:" + port);
    console.log("Visit http://127.0.0.1:8080/index.html for a trial!");
});