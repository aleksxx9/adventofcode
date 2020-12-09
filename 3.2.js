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
        let count = 1;
        count *= getCount(data, 1, 1);
        count *= getCount(data, 3, 1);
        count *= getCount(data, 5, 1);
        count *= getCount(data, 7, 1);
        count *= getCount(data, 1, 2);

        console.log(count)
    });

const getCount = (data, stepRight, stepDown) => {
    let count = 0;
    let stepDownCount = stepDown;
    let stepRightCount = stepRight;
    data.forEach((element, index) => {
        if (index != 0 && stepDownCount == index) {
           let newLine = element;
            while (newLine.length <= data.length * stepRight) {
                newLine += element;
            }
            if (newLine[stepRightCount] == '#') count++;
            stepDownCount += stepDown;
            stepRightCount += stepRight;
        }
    });
    return count;
}