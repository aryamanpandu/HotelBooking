const http = require('http');
const url = require('url');
const fs = require('fs');
// const querystring = require('querystring');
const path = require('path');

// const fileNames = {
//     html: '../public/index.html',
//     js: 'utils/fileHandler.js',
//     navHtml: '../public/nav.html',
//     backgroundImg: '../assets/hotel-background.jpg',
//     icon: '../assets/hotel.png',
//     searchIcon: '../assets/search.svg'
// };

const extensions = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'application/javascript',
        '.png' : 'image/png',
        '.csv' : 'text/csv',
        '.svg' : 'image/svg+xml',
        '.jpg' : 'image/jpg'
    };

const publicDir = path.join(__dirname, '../public/');
const assetsDir = path.join(__dirname, '../assets/');
const utilsDir = path.join(__dirname, '/utils/');
const srcDir = __dirname;

const port = 3000;

function getFilteredRooms(roomType) {
    const filePath = path.join(__dirname, '../../data/rooms.csv');

    try {
        const data = fs.readFileSync(filePath, 'utf8'); // Read file synchronously
        const lines = data.split('\n');
        const rows = lines.slice(1).map(line => line.split(',').map(value => value.trim()));

        const roomData = rows.map(row => ({
            roomType: row[0],
            location: row[1],
            numOfBedrooms: row[2],
            poolIncluded: row[3],
            avgRating: row[4],
            price: row[5]
        }));

        // Filter rooms by the specified type
        const filteredRooms = roomData.filter(room => room.roomType.toLowerCase() === roomType.toLowerCase());

        return filteredRooms; // Synchronous function returns filtered data
    } catch (err) {
        console.error("Error reading file:", err);
        return [];
    }
}

const server = http.createServer((req, res) => {
    
    const { pathname, query } = url.parse(req.url);
    let filePath;
    console.log(pathname);
    if (pathname == '/') {
        filePath = path.join(publicDir, 'index.html');
    } else if (pathname.startsWith('/public/')) {
        filePath = path.join(publicDir, pathname.replace('/public/', ''));
    } else if (pathname.startsWith('/assets/')) {
        filePath = path.join(assetsDir, pathname.replace('/assets/', ''));
    } else if (pathname.startsWith('/src/utils/')) {
        filePath = path.join(utilsDir, pathname.replace('/src/utils/', ''));
    } else if (pathname.startsWith('/src/')) {
        filePath = path.join(srcDir, pathname.replace('/src/', ''));
    } 
    
    else if (pathname.startsWith('/search')) {
        const roomType = query.roomType;
        if (roomType){
            const filteredRooms = getFilteredRooms(roomType);

            res.setHeader('Content-Type', 'application/json');
            res.end((JSON.stringify(filteredRooms)));
        } else {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({error: 'roomType query parameter is required'}));
        }
    } 
    
    else {
        filePath = path.join(publicDir, pathname);
    }
    console.log(`FilePath: ${filePath}`);
    const extName = path.extname(filePath);
    const contentType = extensions[extName] || 'text/plain';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Page not found</h1>');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            if (contentType.startsWith('text') || contentType === 'application/javascript') {
                res.end(data, 'utf-8');
                // res.end(data); 
            } else {
                res.end(data);
            }
            console.log('File successfully sent');
        }
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});