const common = require('../../../scripts/common');

module.exports = input => {
    return common.addAll(common.parseListToInt(input));
}