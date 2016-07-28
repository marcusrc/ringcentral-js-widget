const fs = require('fs');
const path = require('path');
const { analysis } = require('./analysis');
const Handlebars = require('handlebars');
const data = analysis();
const source = fs.readFileSync(path.resolve(__dirname + '/template/template.hbs'), 'utf-8');
const children = fs.readFileSync(path.resolve(__dirname + '/template/children.hbs'), 'utf-8');
Handlebars.registerPartial('children', children);
const template = Handlebars.compile(source);
const html = template(data);
console.log(html);
