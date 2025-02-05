'use strict';
const {CreateUuid} = require('../../services/CreateUuid');
const {UploadFileInABucket} = require('../../services/UploadFileInABucket');
const path = require('path');
const fs = require('node:fs');
const _ = require("lodash");
const AWS = require('aws-sdk');
const { Buffer } = require('buffer');
const randomString = require('random-string');
const axios = require('axios').default;
const {getKeyValueMap, getKeyValueRelationship, extraerTexto} = require('../../services/utilsTextract');

class TextractController {

	async AnalizarDocumento(req, res) {

		const jsonFile = JSON.parse(fs.readFileSync('./secure-files/data.json', 'utf8'));
		const bucketName = jsonFile.BUCKET_NAME;
		const region = jsonFile.BUCKET_REGION;
		const accessKey = jsonFile.AWS_ACCESS_KEY;
		const secretKey = jsonFile.AWS_SECRET_KEY;


		AWS.config = new AWS.Config();
		AWS.config.accessKeyId = accessKey;
		AWS.config.secretAccessKey = secretKey;
		AWS.config.region = region;
		const uploader = new UploadFileInABucket();
		const textract = new AWS.Textract();

		// procesando el archivo base64 a buffer
		const buffer = Buffer.from(req.body.file, 'base64');

		const formatoFile = req.body.name.split('.').pop();
        let nombre = randomString({
            length: 32,
            charset: 'alphanumeric'
        });
        nombre = nombre + "." + formatoFile;

	  	uploader.invoke(buffer, formatoFile, nombre).then((resolve) => {

			if (resolve) {

				let formatoFinal = formatoFile !== "pdf" ? "document" : "pdf";

				const formData = JSON.stringify({
					"name": nombre,
					"type": formatoFinal
				});

                axios({
                    method: 'POST',
                    baseURL: jsonFile.URL_TUNEL,
                    url: "/textract",
                    headers: {
                    	"Content-Type": " application/json"
                    },
                    data: formData,
                })
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(err => { 
                    res.status(402).json(err);
                });

		  	} else {
		  		res.status(403).json('No se ha podido subir el archivo')
		  	}

	  	});

	}

	async AnalizarDocumento2(req, res) {

		const jsonFile = JSON.parse(fs.readFileSync('./secure-files/data.json', 'utf8'));
		const bucketName = jsonFile.BUCKET_NAME;
		const region = jsonFile.BUCKET_REGION;
		const accessKey = jsonFile.AWS_ACCESS_KEY;
		const secretKey = jsonFile.AWS_SECRET_KEY;


		AWS.config = new AWS.Config();
		AWS.config.accessKeyId = accessKey;
		AWS.config.secretAccessKey = secretKey;
		AWS.config.region = region;
		const uploader = new UploadFileInABucket();
		const textract = new AWS.Textract();

		const formatoFile = req.file.originalname.split('.').pop();

	  	uploader.invoke(req.file.buffer, formatoFile, req.file.originalname).then((subido) => {

			if (subido) {

				let formatoFinal = formatoFile !== "pdf" ? "document" : "pdf";

				const formData = JSON.stringify({
					"name": nombre,
					"type": formatoFinal
				});

                axios({
                    method: 'POST',
                    baseURL: jsonFile.URL_TUNEL,
                    url: "/textract",
                    headers: {
                    	"Content-Type": " application/json"
                    },
                    data: formData,
                })
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(err => { 
                    res.status(402).json(err);
                });

		  	} else {
		  		console.log('fallo en la subida del archivo');
		  		res.status(403).json('No se ha podido subir el archivo')
		  	}

	  	});

	}

	async AnalizarFormulario(req, res) {

		const jsonFile = JSON.parse(fs.readFileSync('./secure-files/data.json', 'utf8'));
		const bucketName = jsonFile.BUCKET_NAME;
		const region = jsonFile.BUCKET_REGION;
		const accessKey = jsonFile.AWS_ACCESS_KEY;
		const secretKey = jsonFile.AWS_SECRET_KEY;


		AWS.config = new AWS.Config();
		AWS.config.accessKeyId = accessKey;
		AWS.config.secretAccessKey = secretKey;
		AWS.config.region = region;
		const uploader = new UploadFileInABucket();
		const textract = new AWS.Textract();

		// procesando el archivo base64 a buffer
		const buffer = Buffer.from(req.body.file, 'base64');

		const formatoFile = req.body.name.split('.').pop();
        let nombre = randomString({
            length: 32,
            charset: 'alphanumeric'
        });
        nombre = nombre + "." + formatoFile;

	  	uploader.invoke(buffer, formatoFile, nombre).then((resolve) => {

			if (resolve) {

				let formatoFinal = formatoFile !== "pdf" ? "document" : "pdf";

				const formData = JSON.stringify({
					"name": nombre,
					"type": formatoFinal
				});

                axios({
                    method: 'POST',
                    baseURL: jsonFile.URL_TUNEL,
                    url: "/textract",
                    headers: {
                    	"Content-Type": " application/json"
                    },
                    data: formData,
                })
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(err => { 
                    res.status(402).json(err);
                });


		  	} else {
		  		console.log('fallo en la subida del archivo');
		  		res.status(403).json('No se ha podido subir el archivo')
		  	}

	  	});

	}


	async AnalizarFormulario2(req, res) {

		const jsonFile = JSON.parse(fs.readFileSync('./secure-files/data.json', 'utf8'));
		const bucketName = jsonFile.BUCKET_NAME;
		const region = jsonFile.BUCKET_REGION;
		const accessKey = jsonFile.AWS_ACCESS_KEY;
		const secretKey = jsonFile.AWS_SECRET_KEY;


		AWS.config = new AWS.Config();
		AWS.config.accessKeyId = accessKey;
		AWS.config.secretAccessKey = secretKey;
		AWS.config.region = region;
		const uploader = new UploadFileInABucket();
		const textract = new AWS.Textract();

		const formatoFile = req.file.originalname.split('.').pop();

	  	uploader.invoke(req.file.buffer, formatoFile, req.file.originalname).then((subido) => {

	  		// FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'],
			if (subido) {

				const formData = JSON.stringify({
					"name": req.file.originalname,
					"type": "form"
				});

                axios({
                    method: 'POST',
                    baseURL: jsonFile.URL_TUNEL,
                    url: "/textract",
                    headers: {
                    	"Content-Type": " application/json"
                    },
                    data: formData,
                })
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(err => { 
                    res.status(402).json(err);
                });

		  	} else {
		  		console.log('fallo en la subida del archivo');
		  		res.status(403).json('No se ha podido subir el archivo')
		  	}

	  	});

	}

}

module.exports = { TextractController }