const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/4/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        data = data.split('\n\n');
        let tempCount = 0;
        let count = 0;
        data.forEach(el => {
            el = el.split(/\s+/);
            el.forEach(e => {
                [e] = e.split(':');
                if (e == 'byr' || e == 'iyr' || e == 'eyr' || e == 'hgt' || e == 'hcl' || e == 'ecl' || e == 'pid') tempCount++;
            })
            if (tempCount == '7') {
                count++;
            }
            tempCount = 0;
        })
        console.log(count);
    });