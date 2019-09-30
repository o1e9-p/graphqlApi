'use strict';
const { In } = require('typeorm');

const MapRoles = require('../../MapRoles');

const Role = require("../postgre/models/Role");
const Employee = require("../postgre/models/Employee");
const repositories = {};

function getResolvers(connection) {
    const rolesRepository = connection.getRepository(Role);
    const employeesRepository = connection.getRepository(Employee);
    repositories.employee = employeesRepository;
    repositories.role = rolesRepository;

    return {
        Query: {
            getRoles: async () => {
                const roles = await rolesRepository.find();
                const mapRoles = new MapRoles(roles);
                roles.forEach(role => role.calcSubordinates(mapRoles));
                return roles;
            },
        },

        Mutation: {
            addRole: async (root, { chief: chiefId, ...data }) => {
                const role = await rolesRepository.save(new Role({
                    ...data,
                    chief: chiefId,
                    job_open: !data.employeeID
                }));

                let prevSubordinates = [];
                const updatedRoles = [];

                if (chiefId) {
                    const chief = await rolesRepository.findOne({ id: chiefId });
                    chief.addSubordinates([role.id]);
                    prevSubordinates.forEach(subordinate => chief.deleteSubordinate(subordinate));
                    updatedRoles.push(chief);
                }

                rolesRepository.save(updatedRoles);

                return role;
            },

            updateRole: async (root, {id, ...data}) => {
                const role = await rolesRepository.findOne({ id });
                const updatedRoles = [];

                if (role.chief) {
                    const chief = await rolesRepository.findOne({ id: role.chief });
                    chief.deleteSubordinate(role.id);
                    updatedRoles.push(chief);
                }

                if (data.chief) {
                    const chief = await rolesRepository.findOne({ id: data.chief });
                    chief.addSubordinates([id]);
                    updatedRoles.push(chief);
                }

                if (data.employeeID) {
                    const oldEmployee = await employeesRepository.findOne({id: role.employeeID});
                    oldEmployee.changePosition(role.id);
                    const newEmployee = await employeesRepository.findOne({id: data.employeeID});
                    newEmployee.changePosition(role.id);
                }

                role.update({...data });
                rolesRepository.save([...updatedRoles, role]);
            },

            deleteRole: async (root, id) => {
                const role = await rolesRepository.findOne({ id });
                const {chief: chiefId, subordinates: subordinatesIds} = role;
                const chief = await rolesRepository.findOne({ id: chiefId });
                let subordinates = [];

                if (subordinatesIds.length){
                    subordinates = await rolesRepository.find({ id: In(subordinatesIds) });
                    subordinates.forEach(subordinate => subordinate.changeChief(chiefId));
                    chief.addSubordinates(subordinatesIds);
                }


                chief.deleteSubordinate(id);
                rolesRepository.save([chief, ...subordinates]);
                rolesRepository.remove(role);
                const employee = await employeesRepository.findOne({ id: role.employeeID });
                if (employee) {
                    employee.changePosition(id);
                    employeesRepository.save(employee);
                }
                return role;
            },

            addEmployee: async (root, data) => await employeesRepository.save(new Employee(data)),

            updateEmployee: async (root, { personalNumber, ...data }) => {
                const employee = await employeesRepository.findOne({ personalNumber });
                employee.update(data);
                employeesRepository.save(employee);
            },

            deleteEmployee: async (root, { personalNumber }) => {
                const employee = await employeesRepository.findOne({ personalNumber });
                employeesRepository.remove(employee);

                if (employee.positions.length) {
                    const roles = await rolesRepository.find({ id: In(employee.positions) });
                    roles.forEach(role => role.updateEmployeeID(null));
                    rolesRepository.save(roles);
                }

                return employee;
            },
        },

        Role: {
            employee: async ({ employeeID }) => await employeesRepository.findOne({ id: employeeID }),
        },
    };
}

module.exports = {
    getResolvers,
    repositories
};
