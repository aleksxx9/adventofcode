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
            let el1 = el.replace(/(\r\n|\n|\r)/gm, "");
            el1 = new Set(el1);
            el = el.split('\n');
            el1.forEach(letter => {
                let tempCount = 0;
                el.forEach(elem => {
                    for (let i = 0; i < elem.length; i++)
                        if (elem[i] == letter) tempCount++
                })
                if (tempCount == el.length) count++;
            })
        })
        console.log(count);
    });