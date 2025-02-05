'use strict';
const axios = require("axios");
const fs = require('node:fs');
const randomString = require('random-string');

class CreateFileLocal{   
    constructor() {
    }

    invoke(encode64, mimetype) {
        const buffer = Buffer.from(encode64, 'base64');

        const nombre = randomString({
            length: 32,
            charset: 'alphanumeric'
        });

        const finalName = nombre + '.' + mimetype;
        
        fs.writeFile(finalName, buffer, (err) => {
            if (err) return false;
        }) 

        return finalName;
    } 
}

module.exports={CreateFileLocal}