const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/5/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        data = data.split('\n');
        let arr = [];
        data.forEach(el => {
            let min = 0;
            let max = 127;
            for (let i = 0; i < 7; i++) {
                if (el[i] == 'F') {
                    max = Math.floor(max - ((max - min) / 2))
                }
                if (el[i] == 'B') {
                    min = Math.ceil(min + ((max - min) / 2))
                }
            }
            let min1 = 0;
            let max1 = 7;
            for (let i = 7; i < 10; i++) {
                if (el[i] == 'L') {
                    max1 = Math.floor(max1 - ((max1 - min1) / 2))
                }
                if (el[i] == 'R') {
                    min1 = Math.ceil(min1 + ((max1 - min1) / 2))
                }
            }
            arr.push(min * 8 + min1);
        })
        arr = arr.sort((a,b) => a -b);
        console.log(arr[arr.length-1]);
    });