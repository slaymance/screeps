import { spawnCreep } from './spawnCreep';

export const rooms = () => _.forEach(Game.rooms, room => spawnCreep(room))