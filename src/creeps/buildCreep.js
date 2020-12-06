export const calculateCost = parts => parts.reduce((cost, part) => cost + BODYPART_COST[part], 0)

export const buildBody = (room, { parts }) => parts
  .flatMap(part => Array(room.energyAvailable / calculateCost(parts) | 0).fill(part));

export const buildName = () => `${Game.time}`;

export const buildOpts = ({ role }) => ({ memory: { role } });

export const buildCreep = (room, creep) =>
  [buildBody(room, creep), buildName(), buildOpts(creep)];
