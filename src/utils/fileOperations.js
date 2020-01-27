const fs = require('promise-fs');

const readJSON = async () => {
  const notesData = await fs.readFile('./resources/notes.json');
  return JSON.parse(notesData);
};
const writeJSON = async (contents) => {
  await fs.writeFile('./resources/notes.json', contents);
};

module.exports = { readJSON, writeJSON };
