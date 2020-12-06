import { buildCreep, calculateCost } from './buildCreep';
import { builder } from './builder';

export const harvester = {
  parts: [WORK, MOVE, CARRY],
  role: 'harvester',
  build: room => buildCreep(room, harvester),
  run: creep => {
    if (creep.store.getFreeCapacity() > 0) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
  },
  shouldSpawn: (room, roomCreeps) => roomCreeps.length < 4 || (roomCreeps.filter(creep => creep.memory.role === harvester.role).length < 4 &&
    (room.energyCapacityAvailable / calculateCost(harvester.parts) | 0) * calculateCost(harvester.parts) <= room.energyAvailable),
};

/**
 * shouldSpawn logic for static mining:
 * roomCreeps.filter(creep => creep.memory.role === ROLE).length < room.find(FIND_SOURCES).length * 4 &&
    (room.energyCapacityAvailable / COST | 0) * COST <= room.energyAvailable,
 */