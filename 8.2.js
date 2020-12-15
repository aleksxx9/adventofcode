const fetch = require('node-fetch');
require('dotenv').config()

fetch('https://adventofcode.com/2020/day/8/input', {
    headers: {
        cookie: process.env.ID
    }
})
    .then(res => res.text())
    .then(data => {
        data = data.trim();
        const rules = data.split('\n');
        const rulesWithIndexes = getRules(rules);
        let acc = 0;
        const length = Object.keys(rulesWithIndexes).length - 1
        for (let i = 0; i < length; i++) {
            const visitedSteps = new Set();
            const rulesWithIndexes = getRules(rules);
            if (rulesWithIndexes[i][1][0] == 'nop') {
                rulesWithIndexes[i][1][0] = 'jmp';
            } else if (rulesWithIndexes[i][1][0] == 'jmp') {
                rulesWithIndexes[i][1][0] = 'nop';
            } else continue;
            let visited = new Set();
            visited = checkInstructions(rulesWithIndexes, 0, visitedSteps, acc);
            if (visited.has(rulesWithIndexes[length])) {
                let answer = 0;
                visited.forEach(rule => {
                    if (rule[1][0] == 'acc') answer += parseInt(rule[1][1]);
                })
                console.log(answer);
                break;
            }
        }
    });

const checkInstructions = (rules, index, visited, acc) => {
    if (rules[index]) {
        if (visited.has(rules[index])) return visited;
        visited.add(rules[index]);
        if (rules[index][1][0] == 'acc') {
            acc = acc + parseInt(rules[index][1][1]);
            checkInstructions(rules, index + 1, visited, acc);
        }
        if (rules[index][1][0] == 'jmp') {
            checkInstructions(rules, index + parseInt(rules[index][1][1]), visited, acc)
        }
        if (rules[index][1][0] == 'nop') {
            checkInstructions(rules, index + 1, visited, acc);
        }
    }
    return visited;
}

const getRules = (rules) => {
    let rulesWithIndexes = {};
    rules.forEach((rule, index) => {
        const ruleAndIndex = [];
        ruleAndIndex.push(index);
        rule = rule.split(' ')
        ruleAndIndex.push(rule);
        rulesWithIndexes[index] = ruleAndIndex;
    })
    return rulesWithIndexes;
}