/** Do not delete or change any function name **/

function getUserById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id)
  }, randomRequestTime);
}


//! write code here 
function mapLimit(inputs, limit, iterateeFn, callback) {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    return callback([]);
  }

  if (limit <= 0) {
    return callback([]);
  }

  const results = new Array(inputs.length);
  let runningCount = 0;
  let completedCount = 0;
  let index = 0;

  const next = () => {
    while (runningCount < limit && index < inputs.length) {
      const currentIndex = index++;
      runOperation(inputs[currentIndex], currentIndex);
    }
  };

  const runOperation = (input, currentIndex) => {
    runningCount++;

    iterateeFn(input, (result) => {
      results[currentIndex] = result;
      runningCount--;
      completedCount++;

      if (completedCount === inputs.length) {
        return callback(results);
      }

      next();
    });
  };

  next();
}


mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.print('output:', allResults) // ["User1", "User2", "User3", "User4", "User5"]
});



//! key concepts
// index tracks the next task to start
// runningCount tracks active async operations
// completedCount ensures final callback runs once
// next() works as a scheduler
// Result order is preserved using currentIndex