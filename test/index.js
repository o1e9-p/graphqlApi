'use strict';
const { expect } = require('chai');
const { describe, it } = require('mocha');

const rolesData = require('./data/addRolesData');
const employeesData = require('./data/addEmployeesData');
const deleteRoleTestExpectation = require('./data/deleteRoleData');
const rolesDataWithEmployeeId = require('./data/rolesWithEmployeeIdData');
const updateRolesTestExpectation = require('./data/updateRoleData');

const FakeRepository = require('./FakeRepository');
const { getResolvers, repositories } = require('../src/DAL/graphql/resolvers');
const { Query, Mutation } = getResolvers({ getRepository: (origin) => new FakeRepository(origin) });
const { employee: fakeEmployeeRepo, role: fakeRoleRepo } = repositories;
let newRoleTestExpectation;

describe('Mutation', async () => {
    await addEmployeesTest();
    await addRolesTest();
    await deleteRoleTest();
    await addNewRole();
    await deleteEmployee();
    await addNewEmployee();
    await updateEmployee();
    await updateRole();
});


async function addRolesTest() {
    const {testData, testExpectation } = rolesData;

    for (const role of testData){
        await Mutation.addRole({}, role)
    }
    return new Promise(resolve => {
        describe('addRole', () => {

            it('should return roles object with EmployeeID field', () => {
                expect(fakeRoleRepo.fakeDb).to.deep.equal(rolesDataWithEmployeeId);
                resolve();
            });
        });
    })

}

function addEmployeesTest() {
    const { testData, testExpectation } = employeesData;

    for (const employee of testData){
        Mutation.addEmployee({}, employee)
    }
    return new Promise(resolve => {
        describe('addEmployee', () => {
            it('should create 5 correct employees', () => {
                expect(fakeEmployeeRepo.fakeDb).to.deep.equal(testExpectation);
                resolve()
            });

        });
    })
}

async function deleteRoleTest() {
    const { testExpectation } = employeesData;
    testExpectation[4].positions.splice(0, 1);
    Mutation.deleteRole({}, 4);

    return new Promise ((resolve) => {
        describe('deleteRole', () => {
            it('should remove the role, and save integrity objects', () => {
                expect(fakeRoleRepo.fakeDb).to.deep.equal(deleteRoleTestExpectation);
            });
            it('should remove the position of the employee (id: 4)', () => {
                expect(fakeEmployeeRepo.fakeDb).to.deep.equal(testExpectation);
                resolve()
            });
        })
    });
}

async function addNewRole() {
    const newRole = {
        employeeID: null,
        role: 'C1*',
        department: 'C',
        chief: 1,
    };

    newRoleTestExpectation = JSON.parse(JSON.stringify(deleteRoleTestExpectation));

    newRoleTestExpectation[7] = {
        'chief': 1,
        'department': 'C',
        'employeeID': null,
        'id': 7,
        'job_open': true,
        'role': 'C1*',
        'subordinates': [],
    };

    newRoleTestExpectation[1].subordinates = [2, 5, 6, 7];


    await Mutation.addRole({}, newRole);
    return new Promise(resolve => {
        describe('addRole', () => {
            it('should create correct new role', () => {
                expect(fakeRoleRepo.fakeDb[7]).to.deep.equal(newRoleTestExpectation[7]);
            });
            it('should save correct structure of trie roles', function () {
                expect(fakeRoleRepo.fakeDb).to.deep.equal(newRoleTestExpectation);
                resolve()
            });
        });
    });

}

async function deleteEmployee() {
    const roleTestExpectation = {
        id: 5,
        job_open: true,
        employeeID: null,
        role: 'C2',
        department: 'C',
        chief: 1,
        subordinates: [],
    };

    await Mutation.deleteEmployee({}, { personalNumber: 123414 });
    return new Promise (resolve => {
        describe('deleteEmployee', () => {
            it('should remove employee (id: 4) success', () => {
                expect(fakeEmployeeRepo.fakeDb[4]).to.be.undefined;
            });

            it('should correct change the role (id: 5)', () => {
                expect(fakeRoleRepo.fakeDb[5]).to.deep.equal(roleTestExpectation);
                resolve();
            });
        })
    });
}

async function addNewEmployee() {
    const employee = {
        personalNumber: 123422,
        name: 'Sema*',
        surname: 'Semin*',
        avatar: 'https://avatarStorage.com/2',
    };

    await Mutation.addEmployee({}, employee);

    return new Promise(resolve => {
        describe('addEmployee', () => {
            it('should add correct employee', () => {
                expect(fakeEmployeeRepo.fakeDb[6]).deep.equal({ id: 6, ...employee, positions: [] });
            });
        });
    });
}

async function updateEmployee() {
    const { testExpectation } = employeesData;
    const data = {
        personalNumber: 123411,
        surname: 'Ivanov',
        avatar: 'https://avatarStorage.com/11'
    };

    await Mutation.updateEmployee({}, data);
    return new Promise(resolve => {
       describe('update employee', () => {
           it('should update employee success', () => {
               expect(fakeEmployeeRepo.fakeDb[1]).deep.equal({ ...testExpectation[1], ...data });
               resolve();
           });
       });
    });
}

async function updateRole() {
    const data = [
        {
            id: 7,
            chief: 2,
        },
        {
            id: 5,
            chief: 7,
            department: 'D',
            employeeID: 5,
        },
    ];

    const { testExpectation } = JSON.parse(JSON.stringify(employeesData));
    testExpectation[5].positions.push(5);
    testExpectation[6] = {
        'avatar': 'https://avatarStorage.com/2',
        'id': 6,
        'name': 'Sema*',
        'personalNumber': 123422,
        'positions': [],
        'surname': 'Semin*',
    };

    await Mutation.updateRole({}, data[0]);
    await Mutation.updateRole({}, data[1]);
    return describe('Update role', () => {
        it('should correct change roles', () => {
            expect(fakeRoleRepo.fakeDb).deep.equal(updateRolesTestExpectation);
        });
        it('should correct update employee(id: 5)', () => {
            expect(fakeEmployeeRepo.fakeDb[5]).deep.equal(testExpectation[5]);
        });
        it('should correct update employee(id: 6)', () => {
            expect(fakeEmployeeRepo.fakeDb[6]).deep.equal(testExpectation[6]);
        });
    })
}
