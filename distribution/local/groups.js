
const groups = {};
const { id } = require("@brown-ds/distribution/distribution/util/util");

groups.get = function(name, callback) {

    if (!groups[name]) {

        return callback(new Error('Group not found'), null);
      }
      callback(null, groups[name])
      return groups[name];
};

groups.put = function(config, group, callback) {
  let gid= ""
  if (config instanceof Object) {
      gid = config.gid;
      hash = config.hash;
  }else{
    gid = config
  }
  global.distribution[gid] = {
      status: require('../all/status')({gid: gid}),
      comm: require('../all/comm')({gid: gid}),
      gossip: require('../all/gossip')({gid: gid}),
      groups: require('../all/groups')({gid: gid}),
      routes: require('../all/routes')({gid: gid}),
      mem: require('../all/mem')({gid: gid,hash: hash}),
      store: require('../all/store')({gid: gid,hash: hash}),
  };

  groups[gid] = group;
  groups["all"] = group
  callback(null, group);
};

groups.del = function(name, callback) {
    if (!groups[name]) {
        return callback(new Error('Group not found'), null);
      }
      const oldGroup = groups[name];
      delete groups[name];
      return callback(null, oldGroup);

};

groups.add = function(name, node, callback) {
    groups[name][id.getSID(node)] = node;
        if (callback) {
            return callback(null, groups[name]);
          }

};

groups.rem = function(name, node, callback) {
    if (!groups[name]) {
        if (callback) {
          return callback(new Error('Group not found'), null);
        }
      }
      delete groups[name][node];
      if (callback) {
        return callback(null, groups[name]);
      }
};

module.exports = groups;
