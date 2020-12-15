const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/9/input', {
    headers: {
        cookie: process.env.ID
    }
})
    .then(res => res.text())
    .then(data => {
        const numbers = data.trim().split('\n').map(Number);
        for (let i = 0; i < numbers.length; i++) {
            if (i >= 25) {
                let check = false;
                for (let j = i - 25; j <= i; j++){
                    for (let k = j + 1; k <= i; k++){
                        if (numbers[j] + numbers[k] == numbers[i]) {
                            check = true; 
                        }
                    }
                }
                if (check == false) {
                    console.log(numbers[i])
                    break
                }
            }
        }
    });