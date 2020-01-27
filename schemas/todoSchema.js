const JOI = require('@hapi/joi');

const postNoteSchema = JOI.object().keys({
  title: JOI.string().required(),
  description: JOI.string().required(),
});

module.exports = postNoteSchema;
