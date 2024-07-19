// eslint-disable-next-line no-unused-vars
function myBind(callback, thisArg, ...args) {
  return function(...args2) {
    return callback.apply(thisArg, [...args, ...args2]);
  };
}