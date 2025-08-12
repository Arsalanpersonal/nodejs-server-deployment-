const mongoos = require("mongoose");

module.exports = {
  isValidId: (id) => {
    return mongoos.Types.ObjectId.isValid(id);
  },
  recordFounder: async (model, id) => {
    try {
      const record = await model.findById(id);
      return record ? [true, record] : [false, {}];
    } catch (error) {
      console.error(error);
      return [false, {}];
    }
  },
};
