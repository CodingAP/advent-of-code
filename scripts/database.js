const fs = require('fs');

class Database {
    constructor(file) {
        this.file = file;
        let rawStrings = fs.readFileSync(file).toString().replace(/[\r]/g, '').split('\n');
        
        let headersWTypes = rawStrings[0].split('|').slice(1);
        this.headers = [];
        for (let i = 0; i < headersWTypes.length; i++) {
            let headerSplit = headersWTypes[i].split('(');
            if (headerSplit.length == 1) throw new Error(`No data type provided for value '${headerSplit[0]}'!`);
            this.headers[i] = {
                name: headerSplit[0],
                type: headerSplit[1].replace(')', '')
            }
        }
        
        this.entries = {};
        for (let i = 1; i < rawStrings.length; i++) {
            let data = rawStrings[i].split('|');
            let id = data[0]; data = data.slice(1);
            this.entries[id] = [];
            for (let j = 0; j < data.length; j++) {
                let value = null;
                switch (this.headers[j].type) {
                    case 'int':
                        value = parseInt(data[j]);
                        break;
                    case 'float':
                        value = parseFloat(data[j]);
                        break;
                    case 'string':
                        value = data[j];
                        break;
                    case 'boolean':
                        value = data[j] == 'true';
                        break;
                    default:
                        throw new Error(`Invalid data type for value '${this.headers[j].name}': ${this.headers[j].type}!`);
                }
                this.entries[id][j] = value;
            }
        }
    }
    
    get(id, value = '') {
        if (this.entries[id] == null) throw new Error(`Entry with id '${id}' doesn't exist!`);
        if (value == '') {
            return this.entries[id];
        } else {
            if (this.getHeaderIndex(value) == -1) throw new Error(`Entries do not contain value '${value}'!`);
            return this.entries[id][this.getHeaderIndex(value)];
        }
    }
    
    getAll(value) {
        if (this.getHeaderIndex(value) == -1) throw new Error(`Entries do not contain value '${value}'!`);
        let values = [];
        let ids = Object.keys(this.entries);
        for (let i = 0; i < ids.length; i++) {
            values.push({
                id: ids[i],
                value: this.entries[ids[i]][this.getHeaderIndex(value)]
            });
        }
        return values;
    }
    
    isInDatabase(id) {
        return this.entries[id] != null;
    }
    
    add(id, ...data) {
        if (data.length != this.headers.length) throw new Error(`Given data doesn't fit in entry: Given length (${data.length}), Needed length (${this.headers.length})`);
        this.entries[id] = [];
        for (let i = 0; i < data.length; i++) {
            let value = null;
            if (this.getDataType(data[i]) != this.headers[i].type) throw new Error(`Wrong data type for value '${data[i]}': Expected ${this.headers[i].type}, got ${this.getDataType(data[i])}`);
            switch (this.headers[i].type) {
                case 'int':
                    value = parseInt(data[i]);
                    break;
                case 'float':
                    value = parseFloat(data[i]);
                    break;
                case 'string':
                    value = data[i];
                    break;
                case 'boolean':
                    value = data[i] == 'true';
                    break;
            }
            this.entries[id][i] = value;
            this.save();
        }
    }
    
    remove(id) {
        if (this.entries[id] == null) throw new Error(`Entry with id '${id}' doesn't exist!`);
        delete this.entries[id];
        this.save();
    }
    
    modify(id, value, newValue) {
        if (this.entries[id] == null) throw new Error(`Entry with id '${id}' doesn't exist!`);
        if (this.getHeaderIndex(value) == -1) throw new Error(`Entries do not contain value '${value}'!`);
        if (this.getDataType(newValue) != this.headers[this.getHeaderIndex(value)].type) throw new Error(`Wrong data type for value '${value}': Expected ${this.headers[this.getHeaderIndex(value)].type}, got ${this.getDataType(newValue)}`);
        this.entries[id][this.getHeaderIndex(value)] = newValue;
        this.save();
    }
    
    save() {
        let headerNames = this.headers.map(value => `${value.name}(${value.type})`);
        let savedFile = `id|${headerNames.join('|')}\n`;
        let ids = Object.keys(this.entries);
        for (let i = 0; i < ids.length; i++) savedFile += `${ids[i]}|${this.entries[ids[i]].join('|')}${i == ids.length - 1 ? '' : '\n'}`;
        
        fs.writeFileSync(this.file, savedFile);
    }
    
    getDataType(value) {
        if (typeof value == 'number') {
            if (value.toString().match(/[.]/g)) {
                return 'float';
            } else {
                return 'int';
            }
        } else {
            return typeof value;
        }
    }
    
    getHeaderIndex(name) {
        for (let i = 0; i < this.headers.length; i++) {
            if (this.headers[i].name == name) return i;
        }
        return -1;
    }
}

module.exports = Database;