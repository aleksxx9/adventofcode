const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/7/input', {
    headers: {
        cookie: process.env.ID
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim().split('\n');
        const bags = getListOfBags(data);
        let answer = 0;
        for (let bag in bags) {
            const bagsChecked = new Set();
            const listOfBags = checkBag(bags, bag, bagsChecked)
            if (listOfBags.has('shiny gold')) {
                answer++;
            }
        }
        console.log(answer);
    }
    );

const getListOfBags = (data) => {
    let bagDictionary = {};
    data.forEach(line => {
        let [mainBag, bagContent] = line.split(' bags contain ');
        bagContent = bagContent.substring(0, bagContent.length - 1).replace(/(\sbags|\sbag)/g, '');
        const bagContentArray = bagContent.split(',');
        const bagObject = []
        bagContentArray.forEach(content => {
            content = content.trim();
            if (content != 'no other') {
                bagObject.push(content.substring(2, content.length));
            }
        })
        bagDictionary[mainBag] = bagObject;
    })
    return bagDictionary
}

const checkBag = (bags, bag, bagsChecked) => { 
    bags[bag].forEach(content => {
        bagsChecked.add(content);
        checkBag(bags, content, bagsChecked);
    })
    return bagsChecked;
}