const
    fs = require("fs"),
    path = require("path");

const
    archivePath = path.resolve("problems");

let sqlFilePath = path.join(archivePath, "1", "triangles.sql");
console.log(sqlFilePath);

fs.readFile(sqlFilePath, function (error, fr) {
    console.log(fr.toString());
});
