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
        let destination = getNumber(numbers);
        let indexStart, indexEnd;
        for (let i = 0; i < destination[1] - 1; i++) {
            for (let j = destination[1]; j > i; j--) {
                let check = 0;
                for (let k = i; k <= j; k++) {
                    check += numbers[k];
                }
                if (check == destination[0]) {
                    indexStart = i;
                    indexEnd = j;
                }
            }
        }
        let min = numbers[indexEnd];
        let max = 0;
        for (let i = indexStart; i <= indexEnd; i++) {
            if (min > numbers[i]) min = numbers[i];
            if (max < numbers[i]) max = numbers[i];
        }
        console.log(min + max);


    });

const getNumber = (numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        if (i > 25) {
            let check = false;
            for (let j = i - 25; j <= i; j++) {
                for (let k = j + 1; k <= i; k++) {
                    if (numbers[j] + numbers[k] == numbers[i]) {
                        check = true;
                    }
                }
            }
            if (check == false) {
                return [numbers[i], i]
            }
        }
    }
}