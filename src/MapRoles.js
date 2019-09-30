'use strict';

class MapRoles {
  constructor(roles) {
    roles.forEach(role => this[role.id] = role);
  }
}

module.exports = MapRoles;
