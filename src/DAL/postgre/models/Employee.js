'use strict';

class Employee {
    constructor({ name, surname, avatar, personalNumber, positions=[] }={}) {
        this.personalNumber = personalNumber;
        this.name = name;
        this.surname = surname;
        this.avatar = avatar;
        this.positions = positions;
    }

    update(data) {
        Object.entries(data).forEach(([key, value]) => this[key] = value);
    }

    changePosition(posId) {
        const index = this.positions.findIndex(el => el === Number(posId));
        if (index >= 0) {
            this.positions.splice(index, 1);
        } else {
            this.positions.push(posId);
        }
    }
}

module.exports = Employee;
