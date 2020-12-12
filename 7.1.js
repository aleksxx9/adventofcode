const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/7/input', {
    headers: {
        cookie: process.env.ID
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        data = data.split('\n');
        const bags = bagCeption(data);
        let answer = 0;

        for (let [name, content] of Object.entries(bags)) {
            let ree = checkBag(content, bags, content);
            ree = [].concat.apply([], ree);
            if (ree.includes('shiny gold')) answer++;
        }
        console.log(answer);

    }
    );

const checkBag = (bagName, bags, namesInBag) => {
    if (bagName == undefined)
        return namesInBag
    bagName.forEach(name => {
        if (name != 'no other' && bags[name] != 'no other' && name != 'shiny gold' && !namesInBag.includes('shiny gold')) {
            if (bags[name] != undefined)
                if (bags[name].includes('shiny gold')) {
                    namesInBag.push('shiny gold')
                    return ['shiny gold'];
                } else namesInBag.push(bags[name]);
            if (bags[name] != undefined) {
                if (bags[name].includes('shiny gold')) {
                    return namesInBag;
                }
                checkBag(bags[name], bags, namesInBag)
            }
        } else return namesInBag;
    })
    return namesInBag

}

const bagCeption = (data) => {
    let bags = {};
    data.forEach(line => {
        let bagsInBag = line.split(' contain ');
        bagsInBag[1] = bagsInBag[1].substring(0, bagsInBag[1].length - 1);
        bagsInBag[1] = bagsInBag[1].replace(/( bags|bag)/g, '');
        bagsInBag[0] = bagsInBag[0].replace(/( bags|bag)/g, '');
        let bagArray = bagsInBag[1].split(',');
        const bagCeption = [];
        bagArray.forEach(baggie => {
            baggie = baggie.trim();
            if (baggie != 'no other')
                baggies = baggie.substring(bagsInBag[1].indexOf(' ') + 1);
            else baggies = baggie;
            bagCeption.push(baggies);
        })
        bags[bagsInBag[0]] = bagCeption;
    })
    return bags;
}