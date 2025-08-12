const mongoos = require("mongoose");

const UserSchema = new mongoos.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  user_type: {
    type: String,
    required: true,
    default:"user",
    enum:{
      values:["user","vendor","admin"]
    }
  },
  phone: {
    type: String,
    required: true,
    min: [10, "This field type is invalid !"],
  },
  user_type: {
    type: String,
    required: true,
  },
});
