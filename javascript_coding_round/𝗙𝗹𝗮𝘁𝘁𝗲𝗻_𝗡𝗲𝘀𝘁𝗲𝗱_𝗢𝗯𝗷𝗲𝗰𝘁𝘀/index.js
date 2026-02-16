function flattenObject(obj = {}, parentKey = "") {

  let result = {}

  const createKey = (oldKey, newKey) => {
    if (oldKey) {
      return oldKey + "." + newKey
    } else {
      return newKey
    }
  }

  const next = (objInner, key) => {
    for (let name in objInner) {
      if (
        typeof objInner[name] === "object" &&
        objInner[name] !== null &&
        !Array.isArray(objInner[name])
      ) {
        const fullKey = createKey(key, name)
        next(objInner[name], fullKey)
      } else {
        const fullKey = createKey(key, name)
        result[fullKey] = objInner[name];
      }
    }
  }

  next(obj, parentKey);
  return result;
}



//!==========================================

// Test Example

const user = {
  name: "John",
  age: 30,
  address: {
    country: "India",
    state: null,
    education: {
      school: "APS",
      year: 2021
    }
  }
};

console.log(flattenObject(user, "user"));


// Expected Output
// {
//   "user.name": "John",
//   "user.age": 30,
//   "user.address.country": "India",
//   "user.address.state": null,
//   "user.address.education.school": "APS",
//   "user.address.education.year": 2021
// }


