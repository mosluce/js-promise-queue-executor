const queue = require('./promise-queue').queue

// Example
function promise(step) {
  return (prestep) => new Promise((resolve) => {
    if (prestep) console.log('after step =>', prestep)
    setTimeout(function () {
      console.log('complete =>', step, Date.now())
      console.log('==============')
      resolve(step)
    }, Math.random() * 1500)
  });
}

// queue([1, 2, 3, 4].map(promise)).then(console.log).catch(console.log)
[1, 2, 3, 4].reduce((p, item) => p.then(promise(item)), Promise.resolve())