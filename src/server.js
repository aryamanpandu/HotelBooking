const http = require('http');
const url = require('url');
const fs = require('fs');
// const querystring = require('querystring');
// const path = require('path');

const fileNames = {
    html: '../public/index.html',
    js: 'utils/fileHandler.js',
    navHtml: '../public/nav.html',
    backgroundImg: '../assets/hotel-background.jpg',
    icon: '../assets/hotel.png',
    searchIcon: '../assets/search.svg'
};

const port = 3000;

const server = http.createServer((req, res) => {
    
    const { pathname } = url.parse(req.url);
    console.log(pathname);

    // const filePath = path.join(rootDir,pathname);

    // if (!fs.existsSync(filePath)) {
    //     res.statusCode = 404;
    //     res.end('File Not Found');
    //     return;
    // }

    // const extensions = {
    //     '.html' : 'text/html',
    //     '.css' : 'text/css',
    //     '.js' : 'application/javascript',
    //     '.png' : 'image/png',
    //     '.csv' : 'text/csv'
    // };
    // const ext = path.extname(filePath);
    // res.setHeader('Content-Type', extensions[extensions]);

    // fs.readFile(filePath, (err, data) => {
    //     if (err) {
    //         res.statusCode = 500;
    //         res.end('Error reading file');
    //         return;
    //     }
    //     res.end(data);
    // });

    switch (pathname) {
        case '/':
            fs.readFile(`${__dirname}/${fileNames.html}`, 'utf-8', (err, file) => {
                if (err) {
                    console.log(`Error opening file: ${err}`);
                    return
                }
                
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                res.end(file);
            });
            break;
            
            case '/src/utils/fileHandler.js':
                fs.readFile(`${__dirname}/${fileNames.js}`, 'utf-8', (err, file) => {
                    if (err) {
                        console.log(`Error opening file: ${err}`);
                        return
                    }
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/javascript');
                    res.end(file);
                });
                break;

            case '/public/nav.html':
                fs.readFile(`${__dirname}/${fileNames.navHtml}`, 'utf-8', (err, file) => {
                    if (err) {
                        console.log(`Error opening file: ${err}`);
                        return
                    }
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(file);
                });
                break;

            case '/assets/hotel-background.jpg':
                fs.readFile(`${__dirname}/${fileNames.backgroundImg}`, (err, file) => {
                    if (err) {
                        console.log(`Error opening file: ${err}`);
                        return
                    }
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type','image/jpeg');
                    res.end(file);
                });
                break;

            case '/assets/hotel.png':
                fs.readFile(`${__dirname}/${fileNames.icon}`, (err, file) => {
                    if (err) {
                        console.log(`Error opening file: ${err}`);
                        return
                    }
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type','image/png');
                    res.end(file);
                });
                break;
            
            case '/assets/search.svg':
                fs.readFile(`${__dirname}/${fileNames.searchIcon}`, (err, file) => {
                    if (err) {
                        console.log(`Error opening file: ${err}`);
                        return
                    }
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type','image/svg+xml');
                    res.end(file);
                });
                break;
            default:
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end("<h1 class='text-center'>Page Not Found.<h1>");
                break;

    }

});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});