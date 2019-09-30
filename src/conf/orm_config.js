'use strict';

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "oleg",
  password: "",
  database: "api",
  synchronize: true,
  logging: false,
  entities: [
    require("../DAL/postgre/entities/employee_schema"),
    require("../DAL/postgre/entities/role_schema")
  ]
};