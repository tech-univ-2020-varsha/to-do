const JOI = require('@hapi/joi');

const postNoteSchema = JOI.object().keys({
  title: JOI.string().required(),
  description: JOI.string().required(),
});

const updateNoteSchema = JOI.object().keys({
  id: JOI.string().guid().required(),
});

const deleteNoteSchema = JOI.object({
  id: JOI.string().guid().required(),
});
module.exports = { postNoteSchema, updateNoteSchema, deleteNoteSchema };
