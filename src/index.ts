import { join } from 'path';
import { promisify } from 'util';
import { execFile as _execFile } from 'child_process';
import { Binary } from '@binary/type';

const execFile = promisify(_execFile);

export const HOME = join(__dirname, '..', 'binary');

export default <Binary>{
  homeDir: HOME,

  binaryDir: join(HOME, 'bin'),

  libraryDir: process.platform == 'linux'
    ? join(HOME, 'lib', 'x86_64-linux-gnu')
    : undefined,

  async version() {
    const { stdout } = await execFile(join(this.binaryDir, 'xz'), ['--version'], {
      env: {
        LD_LIBRARY_PATH: this.libraryDir,
      },
    });
    return stdout.split('\n')[0].trim();
  }
};
