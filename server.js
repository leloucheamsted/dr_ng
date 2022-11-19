const express = require('express');
const { join } = require('path')
const app = express();
const port = process.env.PORT || 8002;

app.get('**', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'))
});

app.use(express.static(join(__dirname, 'build')));

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});