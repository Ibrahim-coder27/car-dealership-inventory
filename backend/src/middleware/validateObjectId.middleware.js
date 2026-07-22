const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid vehicle id", 400));
  }

  next();
};

module.exports = validateObjectId;