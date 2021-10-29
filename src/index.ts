import { platform } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { execFile as _execFile } from 'child_process';
import { Binary } from '@binary/type';

const PREFIX = (() => {
  switch (platform()) {
    case 'win32': return 'bin_x86-64';
    case 'darwin': return 'xz/5.2.5';
    default: return 'usr';
  }
})();

const HOME = join(__dirname, '..', 'binary');
const execFile = promisify(_execFile);

export default <Binary>{
  homeDir: join(HOME, PREFIX),

  binaryDir: platform() == 'win32' ? join(HOME, PREFIX) : join(HOME, PREFIX, 'bin'),

  env: {},

  async version() {
    const { stdout } = await execFile(join(this.binaryDir, 'xz'), ['--version']);
    return stdout.split('\n')[0].trim();
  }
};
