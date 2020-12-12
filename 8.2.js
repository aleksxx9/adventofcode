const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/7/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        
        console.log(data);
    });