const CatalogImports = require('../models/CatalogImports.js');
const fs = require('fs');
const csv = require('csv-parser');

async function imports(req, res) {
    try {
        const results = [];
        fs.createReadStream(process.env.CATALOG_UPLOAD_DIR + "/" + req.file.filename)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(results);

            accountId = req.user.sub;
            catalogName = req.body.catalogName;
            if (catalogName == null || catalogName == "") {
                res.status(403).json({
                    "success" : false,
                    "message" : "CatalogName is required"
                });
                return;
            }
            
            const fileName = req.file.filename;
            const totalRows = results.length;
            console.log(totalRows);
            
            const inport = await CatalogImports.insertOne({
                "accountId":  accountId,
                "catalogName": catalogName,
                "sourceFormat": "csv",
                "status": "uploaded",
                "sourceFile": fileName,
                "totalRows": totalRows,
                "invalidRows": 1,
                "invalidRows": 1,
            });

            res.status(201).json({
            "success" : true,
            "message" : "added successfully!",
            "data" : inport
        });
        });
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { imports };