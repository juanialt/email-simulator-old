const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set default promise as provider and connect mongoose
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DB_URL || 'mongodb://localhost/spotifyzier');

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));
// app.use('/docs', express.static('doc'));
// app.use('/comments', comment);
// app.use('/search', search);
// app.use('/album', album);

app.all('/*', function(req, res) {
    res.sendfile('dist/index.html');
});

app.listen((process.env.APP_PORT || 3000), () => {
    //console.log('SERVER: 127.0.0.1:' + (process.env.APP_PORT || '3000'));
});
