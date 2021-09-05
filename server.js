const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8000);

const port = app.get('port');

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(port, () => console.log(`Listening on port: $[port]`));