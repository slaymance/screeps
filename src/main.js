import roleHarvester from './role.harvester';
import roleUpgrader from './role.upgrader';
import roleBuilder from './role.builder';

export const loop = function () {
  for (var name in Game.rooms) {
    console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
  }

  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters: ' + harvesters.length);
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log('Upgraders: ' + upgraders.length);
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  console.log('Builders: ' + builders.length);

  for (var name in Game.rooms) {
    let bodyParts = [];
    let energyAvailable = Game.rooms[name].energyAvailable;
    while (energyAvailable > 50) {
      if (bodyParts.length % 3 === 0) {
        bodyParts.push(MOVE);
        energyAvailable -= 50;
      } else if (bodyParts.length % 3 === 1) {
        bodyParts.push(CARRY);
        energyAvailable -= 50;
      } else if (bodyParts.length % 3 === 2) {
        bodyParts.push(WORK);
        energyAvailable -= 100;
      }
    }
    if (bodyParts.length >= 3) {
      if (harvesters.length < 4 && !Game.spawns['Ilus'].spawning) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Ilus'].spawnCreep(bodyParts, newName,
          { memory: { role: 'harvester' } });
      } else if (harvesters.length === 4 && upgraders.length < 4 && !Game.spawns['Ilus'].spawning) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Ilus'].spawnCreep(bodyParts, newName,
          { memory: { role: 'upgrader' } });
      } else if (harvesters.length === 4 && builders.length < 4 && !Game.spawns['Ilus'].spawning && Object.keys(Game.constructionSites).length) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Ilus'].spawnCreep(bodyParts, newName,
          { memory: { role: 'builder' } });
      }
    }
  }


  if (Game.spawns['Ilus'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Ilus'].spawning.name];
    Game.spawns['Ilus'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Ilus'].pos.x + 1,
      Game.spawns['Ilus'].pos.y,
      { align: 'left', opacity: 0.8 });
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
  }
}