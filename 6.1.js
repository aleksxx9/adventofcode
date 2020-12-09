const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/6/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        data = data.split('\n\n');
        let count = 0;
        data.forEach(el => {
            el = el.replace(/(\r\n|\n|\r)/gm, "");
            el = new Set(el).size;
            count += el;
        })
        console.log(count);
    });