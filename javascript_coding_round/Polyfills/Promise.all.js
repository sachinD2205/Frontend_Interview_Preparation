const myPromiseAll = (arr) => {

  if(!Array.isArray(arr)){
    throw new TypeError("value is not iterable");
  }

  if(arr.length===0){
    return Promise.resolve(arr)
  }


  let result = [];
  let count = 0;
  return new Promise((res, rej) => {
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then((data) => {
          result[i]=data;
          count++;
          if (count === arr.length) {
            res(result);
          }
        })
        .catch((error) => {
          rej(error);
        });
    }
  });
};

// 1. Basic Success Case
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

myPromiseAll([p1, p2, p3])
  .then((res) => console.log("Success:", res))
  .catch((err) => console.log("Error:", err));

// Expected Output: Success: [10, 20, 30]

//!======================================================================

// 2. With setTimeout (Async)
const p4 = new Promise((resolve) => setTimeout(() => resolve("A"), 1000));

const p5 = new Promise((resolve) => setTimeout(() => resolve("B"), 500));

myPromiseAll([p4, p5])
  .then((res) => console.log("Success:", res))
  .catch((err) => console.log("Error:", err));

// Expected Output (order must match input): Success: ["A", "B"]
// Even though p2 resolves first, result order must follow input order.

//!======================================================================

// 3. One Promise Rejects

const p6 = Promise.resolve(1);
const p7 = Promise.reject("Something went wrong");
const p8 = Promise.resolve(3);

myPromiseAll([p6, p7, p8])
  .then((res) => console.log("Success:", res))
  .catch((err) => console.log("Error:", err));

// Expected Output: Error: Something went wrong

//!======================================================================

// 4. Non-Promise Values
// Real Promise.all also accepts normal values.
// note : Your polyfill should wrap values using:

const p9 = 42;
const p10 = Promise.resolve("Hello");

myPromiseAll([p9, p10]).then((res) => console.log("Success:", res));

//   Expected Output:  Success: [42, "Hello"]

//!======================================================================

// 5. Empty Array
myPromiseAll([]).then((res) => console.log("Success Empty Array:", res));

//  Expected Output: Success Empty Array: []
//  Important: Should resolve immediately.

//!======================================================================

// 6. Large Test Case

const promises = Array.from(
  { length: 5 },
  (_, i) => new Promise((resolve) => setTimeout(() => resolve(i), 100 * i)),
);

myPromiseAll(promises).then((res) =>
  console.log("Success Large Test Case:", res),
);

// Expected Output: Success Large Test Case: [0, 1, 2, 3, 4]

//!======================================================================

// 7. Edge Case – Reject After Some Resolve

const p11 = new Promise((resolve) => setTimeout(() => resolve("OK1"), 500));
const p12 = new Promise((_, reject) => setTimeout(() => reject("Failed"), 800));
const p13 = new Promise((resolve) => setTimeout(() => resolve("OK3"), 1000));

myPromiseAll([p11, p12, p13])
  .then((res) => console.log("Success:", res))
  .catch((err) => console.log("Error:", err));

// Expected Output: Error: Failed






//! notes - take care of this 
// 1. Validate input → throw TypeError if value is not iterable.
// 2. Handle empty input → return Promise.resolve([]) immediately.
// 3. Normalize values → use Promise.resolve(value) to support non-promises and thenables.
// 4. Preserve order → assign results using result[i], never use push().
// 5. Track completion → maintain a counter and resolve only when count === total length.
// 6. Reject early → immediately reject on first promise failure.
// 7. Settle only once → ensure no resolve happens after rejection.
// 8. Support thenables → objects with .then() should work correctly.
// 9. Handle large inputs → should not remain pending or cause memory issues.