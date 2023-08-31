import express from 'express';
import path from 'path';
import { renderToString } from "react-dom/server";

const app = express();

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})