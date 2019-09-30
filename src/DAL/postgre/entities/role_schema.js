'use strict';

const EntitySchema = require("typeorm").EntitySchema;
const Role = require("../models/Role");

module.exports = new EntitySchema({
    name: 'Role',
    target: Role,
    columns: {
        id: {
            generated: true,
            primary: true,
            type: 'int',
        },
        employeeID: {
            type: 'int',
            nullable: true,
        },
        role: {
            type: 'text',
        },
        department: {
            type: 'text',
        },
        subordinates: {
            array: true,
            nullable: true,
            type: 'int',
        },
        chief: {
            type: 'int',
            nullable: true,
        },
        job_open: {
            type: 'boolean',
        },
    },
});
