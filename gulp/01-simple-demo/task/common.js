const path = require('path');
const pathDir = (dir) => {
  return path.join(__dirname, '../', dir);
}
const rootDir = path.resolve(__dirname, '../');

const basePath = {
  base: './public'
};
const targetDest = 'dist';
module.exports = {
  rootDir,
  pathDir,
  basePath,
  targetDest
};