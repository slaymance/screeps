import { buildCreep, calculateCost } from './buildCreep';

export const upgrader = {
  parts: [WORK, MOVE, CARRY],
  role: 'upgrader',
  build: room => buildCreep(room, upgrader),
  run: creep => {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  },
  shouldSpawn: (room, roomCreeps) =>
    roomCreeps.filter(creep => creep.memory.role === upgrader.role).length < 4 &&
    (room.energyCapacityAvailable / calculateCost(upgrader.parts) | 0) * calculateCost(upgrader.parts) <= room.energyAvailable,
};