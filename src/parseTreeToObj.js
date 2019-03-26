function parseTreeToObj(conf, parent = {}) {
  if (conf.valType === "number" || conf.valType === "string") {
    parent[conf.key] = conf.val;
  }
  if (conf.valType === "boolean") {
    parent[conf.key] = !!conf.val;
  }
  if (conf.valType === "function") {
    parent[conf.key] = `@func`+ conf.val;
  }
  if (conf.valType === "undefined") {
    parent[conf.key] = undefined;
  }
  if (conf.valType === "object") {
    parent[conf.key] = {};
    conf.val.forEach(item => parseTreeToObj(item, parent[conf.key]))
  }
  if (conf.valType === "array") {
    parent[conf.key] = [];
    conf.val.forEach(item => parseTreeToObj(item, parent[conf.key]))
  }
  return parent;
}
export default parseTreeToObj;
