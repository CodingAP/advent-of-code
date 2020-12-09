const fs = require('fs');
const fetch = require('node-fetch');
const htmlParser = require('node-html-parser');
const htmlToMarkdown = require('turndown')();
require('dotenv').config();

htmlToMarkdown.keep(['span']);
htmlToMarkdown.addRule('header2', {
    filter: ['h2'],
    replacement: content => {
        return '## ' + content.slice(1);
    }
});

(async () => {
    const response = await fetch(
        `https://adventofcode.com/2015/day/1`, { headers: { cookie: `session=${process.env.SESSION_ID}` } }
    );

    const html = await response.text();

    const root = htmlParser.parse(html);

    const markdown = htmlToMarkdown.turndown(root.querySelectorAll('.day-desc')[0].innerHTML + '\n' + root.querySelectorAll('.day-desc')[1].innerHTML);

    let dir = `./years/2015/day1`;

    fs.writeFile(dir + '/README.md', markdown, (err) => {
        if (err) throw err;
    });
})()