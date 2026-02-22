// !Implement Promise.race (Polyfill)

// Problem Statement:
// Create a function promiseRace(promises) that mimics native Promise.race().

// It should:
// Accept an array of promises (or values)
// Return a promise
// Settle as soon as the first promise settles
// If input is empty → returned promise should never settle

function promiseRace(promises) {
   return new Promise((resolve, reject) => {
       for (let i = 0; i < promises.length; i++) {
           Promise.resolve(promises[i])
               .then(resolve)
               .catch(reject);
       }
   });
}



//! Examples

// Example 1: First Resolve Wins
promiseRace([
  Promise.resolve(1),
  Promise.resolve(2)
])
// → Resolves with 1


//===================


// Example 2: First Reject Wins
promiseRace([
  Promise.reject("error"),
  Promise.resolve(2)
])
// → Rejects with "error"



//===================


// Example 3: Non-Promise Value
promiseRace([
  42,
  Promise.resolve(10)
])
// → Resolves with 42


//===================

promiseRace([])
// → Never settles



//! Notes : 
// Uses Promise.resolve() to normalize non-promise values
// First settle wins (resolve or reject)
// No flag required (Promise settles only once)