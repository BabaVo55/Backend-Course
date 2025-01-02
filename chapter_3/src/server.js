import express from 'express';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 5000;

// Get the file path from the URL of the current module;

const __filename = fileURLToPath(import.meta.url);

// GEt the directory name from file path;

const __dirname = dirname(__filename);

// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets / files
    // Any request for the css files will be resolve to the public directory.

app.use(express.static(path.join(__dirname, "../public")))

// Serving up the HTML file from the /public Directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
    console.log('hello backend: Port: ' + PORT)
})