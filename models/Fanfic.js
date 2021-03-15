const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  genre: { type: String, default: "" },
  tag: { type: Array, default: [] },
  chapters: [
    {
      name: { type: String, default: "" },
      text: { type: String, default: "" },
      image: { type: String, default: "" },
    },
  ],
  comments: [
    {
      name: { type: String, default: "" },
      text: { type: String, default: "" },
    },
  ],
  order: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Fanfic", schema);
