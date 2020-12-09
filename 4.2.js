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
                [e, val] = e.split(':');
                switch (e) {
                    case 'byr':
                        if (val >= 1920 && val <= 2002) tempCount++;
                        break;
                    case 'iyr':
                        if (val >= 2010 && val <= 2020) tempCount++;
                        break;
                    case 'eyr':
                        if (val >= 2020 && val <= 2030) tempCount++;
                        break;
                    case 'hgt':
                        const measure = val.substr(val.length - 2, val.length);
                        val = val.substr(0, val.length - 2);
                        if (measure == 'cm') {
                            if (val >= 150 && val <= 193) tempCount++;
                        }
                        if (measure == 'in') {
                            if (val >= 59 && val <= 76) tempCount++;
                        }
                        break;
                    case 'hcl':
                        if (val[0] == '#') {
                            val = val.substr(1);
                            const reg = /^[a-z0-9]{6}$/;
                            if (reg.test(val)) tempCount++;
                        }
                        break;
                    case 'ecl':
                        if (val == 'amb' || val == 'blu' || val == 'brn' || val == 'gry' || val == 'grn' || val == 'hzl' || val == 'oth') tempCount++;
                        break;
                    case 'pid':
                        if (val.length == 9) tempCount++;
                        break;
                }
            })
            if (tempCount == '7') {
                count++;
            }
            tempCount = 0;
        })
        console.log(count);
    });