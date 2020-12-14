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
        const bags = bagList(data);
        let answer = checkBag(bags, 'shiny gold') - 1;
        console.log(answer);
    });


const bagList = (data) => {
    let bags = {};
    data.forEach(line => {
        line = line.substring(0, line.length - 1);
        let [mainBag, bagContent] = line.split(' bags contain ');
        const contentArray = bagContent.split(', ');
        let contentObject = {};
        contentArray.forEach(content => {
            if (content != 'no other bags') {
                const bagName = content.substring(content.indexOf(' ')).replace(/\sbags|\sbag/g, '').trim();
                const bagCount = parseInt((content.trim()).substring(0, 1))
                contentObject[bagName] = bagCount;
            } else contentObject = {}
        })
        bags[mainBag] = contentObject;
    })
    return bags;
}

const checkBag = (bags, check) => {
    let count = 1;
    for (let content in bags[check]) {
        const bagCount = bags[check][content];
        count += bagCount * checkBag(bags, content);
    }
    return count;
}