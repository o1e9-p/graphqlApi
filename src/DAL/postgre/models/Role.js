'use strict';

class Role {
    constructor({ subordinates = [], ...data} = {}) {
        this.role = data.role;
        this.department = data.department;
        this.subordinates = subordinates;
        this.chief = data.chief;
        this.job_open = data.job_open;
        this.employeeID = data.employeeID;
    }

    calcSubordinates(mapRoles) {
        if (this.amountSubordinates) {
            return this.amountSubordinates[1];
        }

        let amount = 0;
        const firstLine = this.subordinates.length;

        if (firstLine) {
            amount = this.subordinates.reduce((acc, subId) => acc + mapRoles[subId].calcSubordinates(mapRoles), 0)
        }

        this.amountSubordinates = [firstLine, amount + firstLine];
        return this.amountSubordinates[1];
    }

    addSubordinates(ids) {
        this.subordinates = [ ...new Set(this.subordinates.concat(ids))]
    }

    deleteSubordinate(id) {
        const index = this.subordinates.findIndex(el => el === id);
        if (index) {
            this.subordinates.splice(index, 1);
        }
    }

    changeChief(id) {
        this.chief = id;
    }

    updateEmployeeID(id) {
        this.employeeID = id;
        this.job_open = !this.employeeID;
    }

    update(data) {
        Object.entries(data).forEach(([key, value]) => this[key] = value);
    }
}

module.exports = Role;
