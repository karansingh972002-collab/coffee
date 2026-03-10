const fetch = require('node-fetch'); // Assuming node fetch works or we use http module

const http = require('http');

http.get('http://localhost:5000/api/packages', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const pkgs = JSON.parse(data);
        console.log("Packages Count:", pkgs.data ? pkgs.data.length : pkgs);
        if (pkgs.data && pkgs.data.length > 0) {
            console.log("First Package ID:", pkgs.data[0]._id, typeof pkgs.data[0]._id);
        }
    });
}).on('error', (err) => {
    console.error("Error:", err.message);
});
