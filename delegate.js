function delegate(obj, method, ...args) {
  return function() {
    return obj[method](...args);
  };
}

let foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

let baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

// eslint-disable-next-line max-statements-per-line
foo.bar = function() { console.log('changed') };

baz.qux();          // logs 'changed'