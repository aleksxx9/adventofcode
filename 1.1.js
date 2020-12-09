const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/1/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        data = data.split('\n').map(Number);
        let answer = 0;
        data.forEach(el => {
            data.forEach(el2 => {
                if (el + el2 == '2020') answer = el * el2;
            })
        })
        console.log(answer);
    });