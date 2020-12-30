const fs = require('fs');
const fetch = require('node-fetch');
const htmlParser = require('node-html-parser');
const htmlToMarkdown = require('turndown')();
require('dotenv').config();

const currentDay = new Date();

let options = {
    day: '' + currentDay.getDate(),
    year: '' + currentDay.getFullYear()
};

const commandArgs = process.argv.slice(2);
for (let i = 0; i < commandArgs.length; i++) {
    let parts = commandArgs[i].split('=');
    switch (parts[0]) {
        case '--d':
        case '--day':
            options.day = parts[1];
            break;
        case '--y':
        case '--year':
            options.year = parts[1];
            break;
    }
}

htmlToMarkdown.keep(['span']);
htmlToMarkdown.addRule('header2', {
    filter: ['h2'],
    replacement: content => {
        return '## ' + content.slice(1);
    }
});

let fetchMarkdownFromWebsite = async (day, year) => {
    const response = await fetch(
        `https://adventofcode.com/${year}/day/${day}`, { headers: { cookie: `session=${process.env.SESSION_ID}` } }
    );

    const html = await response.text();
    const root = htmlParser.parse(html);
    const markdown = htmlToMarkdown.turndown(root.querySelectorAll('.day-desc')[0].innerHTML + '\n' + root.querySelectorAll('.day-desc')[1].innerHTML);

    let dir = `./years/${year}/day${day}`;

    fs.writeFile(dir + '/README.md', markdown, (err) => {
        if (err) throw err;
        console.log(`Saved the README of day ${day}, year ${year}!`);
    });
}

let fetchMarkdownFromFile = async (day, year) => {
    const markdown = htmlToMarkdown.turndown(htmlParser.parse(await fs.readFileSync('./scripts/md.html')).innerHTML);

    let dir = `./years/${year}/day${day}`;

    fs.writeFile(dir + '/README.md', markdown, (err) => {
        if (err) throw err;
        console.log(`Saved the README of day ${day}, year ${year}!`);
    });
}

if (require.main === module) {
    fetchMarkdownFromWebsite(options.day, options.year);
} else {
    module.exports = fetchMarkdownFromWebsite;
}