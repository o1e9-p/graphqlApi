module.exports = [
    {
        id: 1,
        job_open: true,
        employeeID: null,
        role: '1',
        department: 'A',
        subordinates: [2, 4],
        chief: null,
        employee: {
            personalNumber: 123411,
            name: 'Petya',
            surname: 'Petin',
            avatar: 'https://avatarStorage.com/1',
        }
    },
    {
        id: 2,
        job_open: true,
        employeeID: null,
        role: 'B1',
        department: 'B',
        subordinates: [3],
        chief: 1,
        employee: {
            personalNumber: 123412,
            name: 'Vasya',
            surname: 'Vasin',
            avatar: 'https://avatarStorage.com/2',
        }
    },
    {
        id: 3,
        job_open: true,
        employeeID: null,
        role: 'B2',
        department: 'B',
        subordinates: [],
        chief: 2,
        employee: {
            personalNumber: 123413,
            name: 'Syava',
            surname: 'Syavin',
            avatar: 'https://avatarStorage.com/3',
        }
    }, {
        id: 4,
        job_open: true,
        employeeID: null,
        role: 'C1',
        department: 'C',
        subordinates: [5, 6],
        chief: 1,
        employee: {
            personalNumber: 123414,
            name: 'Sema',
            surname: 'Semin',
            avatar: 'https://avatarStorage.com',
        }
    },
    {
        id: 5,
        job_open: true,
        employeeID: null,
        role: 'C2',
        department: 'C',
        subordinates: [],
        chief: 4,
        employee: {
            personalNumber: 123414,
            name: 'Sema',
            surname: 'Semin',
            avatar: 'https://avatarStorage.com',
        }
    },
    {
        id: 6,
        job_open: true,
        employeeID: null,
        role: 'C3',
        department: 'C',
        subordinates: [],
        chief: 4,
        employee: {
            personalNumber: 123415,
            name: 'Mashka',
            surname: 'Mashkina',
            avatar: 'https://avatarStorage.com',
        }
    },
];
