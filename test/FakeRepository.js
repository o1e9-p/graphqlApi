'use strict';

module.exports = class FakeRepository {
    constructor (Class) {
        this.origin = Class;
        this.fakeDb = {};
        this.lastId = 0;
    }

    async find(data) {
        if (!data) {
            return Object.values(this.fakeDb);
        }
        if (typeof data.id === 'number') {
            return await this.findOne(data)
        }
        if (data.id._value) {
            return data.id._value.reduce((acc, id) => acc.concat([this.fakeDb[id]]), [])
        }
    }

    async findOne({ id, personalNumber, ...data }) {
        if (id) {
            return this.fakeDb[id] || null;
        }
        if (personalNumber) {
            return Object.values(this.fakeDb).find(el => el.personalNumber === personalNumber)
        }

        throw Error(`Unexpected value ${JSON.stringify(data)}`)
    }

    async save(data){
        if (Array.isArray(data)) {
            data.forEach(obj => this._saveOne(obj));
        } else {
            return this._saveOne(data);
        }
    }

    _saveOne(obj) {
        if (!(obj instanceof this.origin)) {
            throw Error(`Object ${JSON.stringify(obj)} is not descendant ${JSON.stringify(this.origin)}`);
        }
        if (!obj.id) {
            obj.id = ++this.lastId;
        }
        return this.fakeDb[obj.id] = obj
    }

    async remove({ id }) {
        delete this.fakeDb[id];
    }
};
