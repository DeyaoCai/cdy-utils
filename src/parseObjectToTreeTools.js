export function getAllValType() {
  return {
    array: [],
    object: [],
    string: "",
    number: 0,
    boolean: false,
    funtion: ``,
  };
}

export function getAllVal(type, val) {
  const retVal = getAllValType();
  if (type !== undefined && val !== undefined) {
    retVal[type] = val;
  }
  return retVal;
}

export function getNextVal(type) {
  return parseObjectToTreeTools()[type];
}

export default {
  getNextVal,
  getAllValType,
  getAllVal
}
