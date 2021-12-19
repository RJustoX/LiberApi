const express = require('express');
const app = express();

const port = 3001;

console.log('iniciando api...');

app.use('/', require('./routes/userRoutes'));

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});