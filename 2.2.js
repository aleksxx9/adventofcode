const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/2/input', {
    headers: {
        cookie: process.env.ID 
    }
})
    .then(res => res.text())
    .then(data => {
        //while fetching input from source there's always additional \n at the end so we are removing all whitespaces
        data = data.trim();
        //then given string/text we are converting into array where new element is divided by \n and then creating from that array new array of numbers, so we can do math with them
        data = data.split('\n');
        let answer = 0;
        data.forEach(line => {
            const array = line.split(' ');
            const values = array[0].split('-');
            const [minVal, maxVal] = values;
            const letter = array[1][0];
            if ((array[2][minVal-1] == letter && array[2][maxVal-1] != letter) || (array[2][maxVal-1] == letter && array[2][minVal-1] != letter)) answer++
        })
        console.log(answer);
    });