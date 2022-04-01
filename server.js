const express = require('express');
const path = require('path');
const app = express();
const port = 5001;

app.get('/user', (req, res) => {
    return res.send({name:'Guest'});
})

app.use(express.static('public'));
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(port, () => console.log(`Listening port ${port}`));