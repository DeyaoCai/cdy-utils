import type from "./type";
import parseObjectToTreeTools from "./parseObjectToTreeTools";
const {getAllVal} = parseObjectToTreeTools;
function parseObjToTree(key, obj) {
  if (type.isArray(obj)) {
    const valType= "array";
    const val = obj.map((item, index) => parseObjToTree(index, item));
    const values =getAllVal(valType, val);
    return {values, key, val, valType};
  }
  if (type.isObject(obj)) {
    const valType= "object";
    const val = Object.keys(obj).map((item) => parseObjToTree(item, obj[item]));
    const values =getAllVal(valType, val);
    return {values, key, val, valType};
  }
  if (type.isBoolean(obj)) {
    const valType= "boolean";
    const val = !!obj;
    const values =getAllVal(valType, val);
    return {values, key, val, valType};
  }
  if (type.isString(obj)) {
    const reg = /@func/;
    const isFunc = reg.test(obj);
    const valType= isFunc ? "function" : "string";
    const val = isFunc ? obj.replace(reg, "") : obj;
    const values =getAllVal(valType, val);
    return {values, key, val, valType};
  }
  if (type.isNumber(obj)) {
    const valType= "number";
    const val = obj;
    const values =getAllVal(valType, val);
    return {values, key, val, valType};
  }
  const valType= "undefined";
  const val = obj;
  const values =getAllVal(valType, val);
  return {values, key, val, valType};
}
export default parseObjToTree;
