import 'core-js/features/array/flat-map';

import { rooms } from './rooms';
import { roles } from './creeps';

export const loop = () => {
  /**
   * Clear dead creeps from memory.
   */
  Object.keys(Memory.creeps).forEach(name => !Game.creeps[name] && delete Memory.creeps[name]);

  /**
   * Runs all code related to individual rooms.
   */
  rooms();

  /**
   * Runs each creep.
   */
  _.forEach(Game.creeps, creep => roles[creep.memory.role].run(creep));
};
