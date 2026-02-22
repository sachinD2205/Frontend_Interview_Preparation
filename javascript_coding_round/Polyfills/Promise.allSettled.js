//! Implement Promise.allsettled
// Waits for all promises to settle
// Never rejects
// Preserves input order
// Returns array of objects

// Each result has:
// status: "fulfilled" + value
// status: "rejected" + reason

const myPromiseAllsettled = (arr) => {
    
  if (arr == null || typeof arr[Symbol.iterator] !== "function") {
    throw new TypeError("value is not iterable");
  }

  const items = Array.from(arr);

  if (items.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((res) => {
    let completed = 0;
    let result = [];

    for (let i = 0; i < items.length; i++) {
      Promise.resolve(items[i])
        .then((data) => {
          result[i] = {
            status: "fulfilled",
            value: data,
          };
        })
        .catch((error) => {
          result[i] = {
            status: "rejected",
            reason: error,
          };
        })
        .finally(() => {
          completed++;
          if (counter === arr.length) {
            res(result);
          }
        });
    }
  });
};

//!==============================================

const p1 = Promise.resolve("Success 1");

const p2 = new Promise((_, reject) =>
  setTimeout(() => reject("Error occurred"), 1000),
);

const p3 = new Promise((resolve) =>
  setTimeout(() => resolve("Success 3"), 500),
);

Promise.allSettled([p1, p2, p3]).then((results) => {
  console.log(results);
});

// Expected Output:
// [
//   { status: "fulfilled", value: "Success 1" },
//   { status: "rejected", reason: "Error occurred" },
//   { status: "fulfilled", value: "Success 3" },
// ];
