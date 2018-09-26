'use strict'
let express = require('express');
let router = express.Router();
let fs = require('fs');
let xml2js = require('xml2js');
let parser = new xml2js.Parser();
const ObjectModel = require('../models/objectModel.js');
const ProcessorRaw = require('../testing/processorRaw');


/**
 * @description Initializes the processing of the data in eaf
 * @return {Promise} A promise that gives the list of the processed objects
 */
function createData() {
    let processorInstance = new ProcessorRaw();
    processorInstance.processData((err, objectList) => {
        if (err) {
            return console.log(err);
        }
       // console.log(objectList);
        let jsonObjectList = JSON.stringify(objectList);
        //console.log(jsonObjectList);
        var jsonFilePath = "../data/objectJson.json";
        //For creating and saving some data
        fs.writeFile(jsonFilePath, jsonObjectList, (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
        });
    });
}

createData();