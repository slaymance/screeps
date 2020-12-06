import { roles } from '../creeps';

export const findRoleToSpawn = room => _.find(
  roles,
  role => role.shouldSpawn(room, _.filter(Game.creeps, creep => creep.room === room)));

export const spawnCreep = room => {
  const roleToSpawn = findRoleToSpawn(room);

  if (roleToSpawn) {
    const openSpawn = _.filter(Game.spawns, spawn => spawn.room === room).find(({ spawning }) => !spawning);
    openSpawn?.room.visual.text(
      '🛠️' + roleToSpawn.role,
      openSpawn.pos.x + 1,
      openSpawn.pos.y,
      { align: 'left', opacity: 0.8 }
    );
    openSpawn?.spawnCreep(...roleToSpawn.build(room));
  }
};
