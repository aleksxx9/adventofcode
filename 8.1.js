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
        const rulesWithIndexes = {}
        rules.forEach((rule, index) => {
            const ruleAndIndex = [];
            ruleAndIndex.push(index);
            rule = rule.split(' ')
            ruleAndIndex.push(rule);
            rulesWithIndexes[index] = ruleAndIndex;
        })
        const visitedSteps = new Set();
        let acc = 0;
        const visited = checkInstructions(rulesWithIndexes, 0, visitedSteps, acc);
        let answer = 0;
        visited.forEach(rule => {
            if (rule[1][0] == 'acc') answer += parseInt(rule[1][1]);
        })
        console.log(answer)
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