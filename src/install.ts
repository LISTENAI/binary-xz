import * as download from 'download';
import { rm } from 'fs/promises';
import { platform } from 'os';
import { join } from 'path';

const PREFIX = 'https://cdn.iflyos.cn/public/lisa-binary/xz/';

const SUFFIX = (() => {
  switch (platform()) {
    case 'win32': return 'windows.zip';
    case 'darwin': return 'darwin_amd64.tar.gz';
    default: return 'linux_amd64.tar.gz';
  }
})();

const NAME = `xz-5.2.5-${SUFFIX}`;
const HOME = join(__dirname, '..', 'binary');

(async () => {

  try {
    await rm(HOME, { recursive: true });
  } catch (e) {
  }

  await download(`${PREFIX}${NAME}`, HOME, {
    extract: true,
  });

})();
