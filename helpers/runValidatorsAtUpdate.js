export const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
