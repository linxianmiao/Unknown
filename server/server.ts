import express from 'express';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';

const Templates: { [reqPath: string]: string } = {
    'index': '/dist/index.ejs'
};

const app = express();

const rootPath = process.cwd();

//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(rootPath, 'dist')));

app.all('/*', (req, res) => {
    const tmpPath = Templates[req.path] || Templates.index;
        
    let filePath = path.join(rootPath, tmpPath);

    if (!fs.existsSync(filePath)) {
        filePath = path.join(rootPath, Templates.index);
    }
    
    const tmpHtml = fs.readFileSync(filePath, 'utf-8');

    res.send(
        ejs.render(
            tmpHtml
        )
    );
})

app.listen(3000, () => {
    console.info('Server is listening on port 3000');
})