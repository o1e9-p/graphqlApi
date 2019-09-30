const EntitySchema = require("typeorm").EntitySchema;
const Employee = require("../models/Employee");

module.exports = new EntitySchema({
    name: 'Employee',
    target: Employee,
    columns: {
        id: {
            generated: true,
            primary: true,
            type: 'int',
        },
        personalNumber: {
            type: 'int',
            unique: true,
        },
        name: {
            type: 'text',
        },
        surname: {
            type: 'text',
        },
        avatar: {
            type: 'text',
        },
        positions: {
            array: true,
            type: 'int',
        },
    },
});
