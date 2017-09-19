const queue = require('./promise-queue').queue

// Example
function promise(txt) {
  return () => new Promise((resolve) => {
    setTimeout(function () {
      console.log(txt, 'done')
      resolve(txt);
    }, Math.random() * 1500);
  });
}

queue([1, 2, 3, 4].map(promise)).then(console.log).catch(console.log)