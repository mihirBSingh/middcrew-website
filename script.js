const express = require("express");
const process = require("process");
const path = require("path");

const app = express();
app.enable("trust proxy");
app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.status(200).send("Up and running")
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

const credentials = require('./key.json');
const GoogleSpreadhseet = require('google-spreadsheet');
const {promisify} = require('util');
const doc = new GoogleSpreadhseet('11xuJd574lA-AI9CVxhedrWCNRxn4-UcHPGEtGH0bpP4')

app.get("/sheets", (req, res) => {
    try{
        (async () => {
            res.status(200).send(await getSpreadsheet())
        })()
    }
    catch(e) {
        res.status(404).send(e)
    }
});


