const express = require('express'), bodyParser = require('body-parser');
const app = express();

const port = 3001;

console.log('iniciando api...');

app.use(bodyParser.json());
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/vicioRoutes'));
app.use('/', require('./routes/rankingRoutes'));
app.use('/', require('./routes/contentRoutes'));

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});