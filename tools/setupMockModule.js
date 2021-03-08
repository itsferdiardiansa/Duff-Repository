const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, process.cwd(), '__mocks__');

const registerMockModule = (dir, file) => {
  if (file.match(/Mock/)) {
    const mockModule = path.join(dir, file).replace(/(.js)/g, '');

    require(mockModule);
  }
};

const findMockModule = dir => {
  const files = dir => fs.readdirSync(dir);

  files(dir).forEach(file => {
    const isDirectory = fs.lstatSync(path.join(dir, file)).isDirectory();

    if (isDirectory) {
      findMockModule(path.join(dir, file));
    }

    registerMockModule(dir, file);
  });
};

export default () => {
  findMockModule(path.join(rootPath));
};
