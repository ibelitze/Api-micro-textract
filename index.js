const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const path = require ('path');
const bodyParser = require('body-parser');


const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(cors({
    origin:['*'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}))

// Middleware
app.use(morgan('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(publicPath)));

app.use(express.urlencoded({
    extended: false, // Whether to use algorithm that can handle non-flat data strutures
    limit: 1000000, // Limit payload size in bytes
    parameterLimit: 10, // Limit number of form items on payload
 }));

// Textract
app.use('/textract', require('./routes/textract/index'));


app.set('puerto', process.env.PORT || 3030);
app.listen(app.get('puerto'), () => {
    console.log('Server Running')
    console.log('Corriendo en puerto: ' + app.get('puerto'));
});