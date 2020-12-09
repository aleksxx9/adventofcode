const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/2/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        data = data.split('\n');
        let answer = 0;
        data.forEach(line => {
            const array = line.split(' ');
            const values = array[0].split('-');
            const [minVal, maxVal] = values;
            const letter = array[1][0];
            let count = 0;
            for (let i = 0; i < array[2].length; i++) {
                if (array[2][i] == letter) count++;
            }
            if (count >= minVal && count <= maxVal) answer++;
        })
        console.log(answer);
    });