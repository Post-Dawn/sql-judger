const
fs = require("fs"),
path = require("path");
const    
archivePath = path.resolve("problems");

fs.readFile(path.join(archivePath, "1", "triangles.sql"),function(error,fr)
            {
                console.log(toString(fr));
            }
    );
//console.log(path.join(archivePath, "1", "triangles.sql"));
//console.log(run(path.join(archivePath, "1", "triangles.sql")));