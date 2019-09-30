GraphQl API

Апи для получение и изменения дерева организационной структуры компании

type Employee {
  id: Int
  personalNumber: Int
  name: String
  surname: String
  avatar: String
  positions: [Int]
}

type Role {
  id: Int
  role: String
  department: String
  subordinates: [Int]
  amountSubordinates: [Int]
  employee: Employee
  chief: ID
  job_open: Boolean
  employeeId: Int
}

QUERY:

Получение списка должностей, с сотрудниками:

getRoles: [Role]

example:
getRoles {
  id
  role
  department
  job_open
  subordinates
  amountSubordinates
  chief
  employee {
    id
    personalNumber
    name
    surname
    avatar
  }
}

MUTATION:

Добавление должности:

addRole(
  role: String!
  department: String!
  chief: Int
  employeeID: Int
): Role

Обновление должности:

updateRole (
  id: Int
  role: String,
  department: String,
  chief: Int,
  employeeID: Int
): Role

Явно добавлять/обновлять поле subordinates нет необходимости, при добавлений или обновлении поля chief изменяется и поле subordinates у должности руководителя.
При добавлении поля employeeID также обновится и поле positions у сущности сотрудника.

Удаление должности:

deleteRole (
  id: Int!
): Role

Добавление сотрудника:

addEmployee(
  name: String!,
  surname: String!,
  personalNumber: Int!,
  avatar: String
): Employee

Обновление сотрудника:

updateEmployee(
  personalNumber: Int!,
  name: String,
  surname: String,
  avatar: String
): Employee

Удаление сотрудника:

deleteEmployee(
  personalNumber: Int!
): Employee


