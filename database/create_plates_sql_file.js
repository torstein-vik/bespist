var fs = require('fs');

// Parsing JSON

var plates = JSON.parse(fs.readFileSync('plates.json', 'utf8'));

var sql = `
-- SQL script for adding attractions

-- If you get Error Code 1175, Go to Edit -> Preferences -> "SQL Editor" -> "Other" -> uncheck "Safe Updates". Then go to Query -> Reconnect to Server

USE \`bespist\`;

-- Deleting all previous entries
SET FOREIGN_KEY_CHECKS=0;
DELETE FROM \`plates\`;
SET FOREIGN_KEY_CHECKS=1;

-- Reseting auto_increment
ALTER TABLE \`plates\` AUTO_INCREMENT = 1;\n\n
`

platesList = []

plates.starter.forEach(function(plate){
    platesList.push([plate.name, plate.content, plate.previewimg, plate.price, "starter"].join('", "'));
});

plates.main.forEach(function(plate){
    platesList.push([plate.name, plate.content, plate.previewimg, plate.price, "main"].join('", "'));
});

plates.dessert.forEach(function(plate){
    platesList.push([plate.name, plate.content, plate.previewimg, plate.price, "dessert"].join('", "'));
});

spaces = "                                                                         ";

sql += "\n-- Adding plates\n";
sql += "INSERT INTO `plates` (name, content, previewimg, price, category) VALUES (\"" + platesList.join("\"),\n" + spaces + "(\"") + "\");\n";

console.log(sql);

fs.writeFile("create_plates.sql", sql, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Saved and complete");
});
