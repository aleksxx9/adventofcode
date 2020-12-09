const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/3/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        data = data.split('\n');
        let stepRight = 3;
        let count = 0;
        data.forEach((element, index) => {
            let newLine = element;
            while (newLine.length <= data.length * stepRight) {
                newLine += element;
            }
            if (index != 0) {
                if (newLine[index * 3] == '#') count++;
            }
        });

        console.log(count);
    });