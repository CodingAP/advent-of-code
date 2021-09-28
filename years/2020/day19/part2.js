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

    rules['8'] = '42 | 42 8';
    rules['11'] = '42 31 | 42 11 31'

    let findString = (i, rule, count8, count11) => {
        if (i == 8 && count8 == 5) return '(' + findString(42, rules[42], count8, count11) + ')';
        if (i == 11 && count11 == 5) return '(' + findString(42, rules[42], count8, count11) + findString(31, rules[31], count8, count11) + ')';

        if (i == 8) count8++;
        if (i == 11) count11++;

        if (rule.charAt(0) == '"') return rule.charAt(1);
        return '(' + rule.split(' ').reduce((rule, part) => rule + (part == '|' ? '|' : findString(part, rules[part], count8, count11)), '') + ')';
    }

    let rule = new RegExp('^' + findString(0, rules[0], 0, 0) + '$', 'gm');
    return strings.match(rule).length;
}