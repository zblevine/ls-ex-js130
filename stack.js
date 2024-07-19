// eslint-disable-next-line no-unused-vars
function newStack() {
  let stack = [];

  return {
    push(val) {
      stack.push(val);
    },

    pop() {
      return stack.pop();
    },

    printStack() {
      stack.forEach((ele) => console.log(ele));
    }
  };
}