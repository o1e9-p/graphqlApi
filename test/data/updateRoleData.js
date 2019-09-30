module.exports = {
    '1': {
        'id': 1,
        'job_open': false,
        'employeeID': 1,
        'role': '1',
        'department': 'A',
        'subordinates': [
            2,
            6,
        ],
        'chief': null,
    },
    '2': {
        'id': 2,
        'job_open': false,
        'employeeID': 2,
        'role': 'B1',
        'department': 'B',
        'subordinates': [
            3,
            7,
        ],
        'chief': 1,
    },
    '3': {
        'id': 3,
        'job_open': false,
        'employeeID': 3,
        'role': 'B2',
        'department': 'B',
        'subordinates': [],
        'chief': 2,
    },
    '5': {
        'id': 5,
        'job_open': false,
        'employeeID': 5,
        'role': 'C2',
        'department': 'D',
        'subordinates': [],
        'chief': 7,
    },
    '6': {
        'id': 6,
        'job_open': false,
        'employeeID': 5,
        'role': 'C3',
        'department': 'C',
        'subordinates': [],
        'chief': 1,
    },
    '7': {
        'chief': 2,
        'department': 'C',
        'employeeID': 6,
        'id': 7,
        'job_open': false,
        'role': 'C1*',
        'subordinates': [
            5
        ],
    },
};
