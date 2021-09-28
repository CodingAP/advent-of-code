module.exports = input => {
    let rules = {}, strings = '';

    let info = input.split(/\n/);
    let mode = 0;
    info.forEach(value => {
        if (value == '') {
            mode++;
            return;
        }

        if (mode == 0) {
            let tokens = value.split(': ');
            rules[tokens[0]] = tokens[1];
        } else if (mode == 1) {
            strings += value + '\n';
        } 
    });

    let findString = rule => {
        if (rule.charAt(0) == '"') return rule.charAt(1);
        return '(' + rule.split(' ').reduce((rule, part) => rule + (part == '|' ? '|' : findString(rules[part])), '') + ')';
    }
    
    let rule = new RegExp('^' + findString(rules[0]) + '$', 'gm');

    return strings.match(rule).length;
}