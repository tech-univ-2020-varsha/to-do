const fs = require('promise-fs');

const readJSON = async () => {
  const notesData = await fs.readFile('./resources/notes.json');
  return JSON.parse(notesData);
};
module.exports = { readJSON };
