// URL -> http://localhost:8003

const express = require('express');
const app = express();
const PORT = 8003
app.listen(PORT, () => console.log('wired in ;)' + `PORT: ${PORT}`))

