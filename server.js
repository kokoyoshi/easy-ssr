import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import NodeJsx from 'node-jsx';
NodeJsx.install({harmony: true});

import Html from './src/Html';
import App from './src/App';

import asset from './build/asset-manifest.json';

const initialData = {
    logo: `/build/${asset['static/media/logo.svg']}`
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/build', express.static('build'));
app.get('/service-worker.js', (req, res) => {
    res.end(fs.readFileSync('./build/service-worker.js'));
});

app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.end(
        ReactDOMServer.renderToStaticMarkup(
            <Html asset={asset} initialData={JSON.stringify(initialData)}>
                <App {...initialData} />
            </Html>
        )
    );
});

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});