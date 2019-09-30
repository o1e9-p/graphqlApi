'use strict';

const { gql } = require('apollo-server');

const typeDefs = gql`  
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
  
  
  type Employee {
    id: Int
    personalNumber: Int
    name: String
    surname: String
    avatar: String
    positions: [Int]
  }

  type Query {
    getRoles: [Role]
  }
  
  type Mutation {
    addRole(
      role: String!,
      department: String!,
      chief: Int,
      employeeId: Int
    ): Role
    
    updateRole(
      id: Int
      role: String,
      department: String,
      chief: Int,
      employeeiD: Int
    ): Role
    
    deleteRole (id: Int!): Role
    
    addEmployee(
      name: String!,
      surname: String!,
      personalNumber: Int!,
      positions: [Int]!,
      avatar: String
    ): Employee
    
    updateEmployee(
      personalNumber: Int!,
      name: String,
      surname: String,
      positions: [Int],
      avatar: String
    ): Employee
    
    deleteEmployee(
      personalNumber: Int!
    ): Employee
  }
`;



module.exports = typeDefs;
