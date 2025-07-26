import * as migration_20250629_202637_initial from './20250629_202637_initial';
import * as migration_20250708_213848 from './20250708_213848';
import * as migration_20250708_214643 from './20250708_214643';
import * as migration_20250708_215138 from './20250708_215138';
import * as migration_20250708_215237 from './20250708_215237';
import * as migration_20250708_224648 from './20250708_224648';
import * as migration_20250708_235402 from './20250708_235402';
import * as migration_20250709_011317 from './20250709_011317';

export const migrations = [
  {
    up: migration_20250629_202637_initial.up,
    down: migration_20250629_202637_initial.down,
    name: '20250629_202637_initial',
  },
  {
    up: migration_20250708_213848.up,
    down: migration_20250708_213848.down,
    name: '20250708_213848',
  },
  {
    up: migration_20250708_214643.up,
    down: migration_20250708_214643.down,
    name: '20250708_214643',
  },
  {
    up: migration_20250708_215138.up,
    down: migration_20250708_215138.down,
    name: '20250708_215138',
  },
  {
    up: migration_20250708_215237.up,
    down: migration_20250708_215237.down,
    name: '20250708_215237',
  },
  {
    up: migration_20250708_224648.up,
    down: migration_20250708_224648.down,
    name: '20250708_224648',
  },
  {
    up: migration_20250708_235402.up,
    down: migration_20250708_235402.down,
    name: '20250708_235402',
  },
  {
    up: migration_20250709_011317.up,
    down: migration_20250709_011317.down,
    name: '20250709_011317'
  },
];
