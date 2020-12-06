import { buildCreep, calculateCost } from './buildCreep';

export const builder = {
  parts: [WORK, MOVE, CARRY],
  role: 'builder',
  build: room => buildCreep(room, builder),
  run: creep => {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
    else {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }

    }
  },
  shouldSpawn: (room, roomCreeps) =>
    roomCreeps.filter(creep => creep.memory.role === builder.role).length < 4 &&
    (room.energyCapacityAvailable / calculateCost(builder.parts) | 0) * calculateCost(builder.parts) <= room.energyAvailable &&
    !_.isEmpty(Game.constructionSites),
};