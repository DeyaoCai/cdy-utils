function _getRelativeComp(obj = {relativeComp: {}}) {
  [].forEach.call(this, item => {
    if (item && item.relativeComp) {
      const relativeCompList = Object.keys(item.relativeComp);
      relativeCompList.forEach(key => (obj.relativeComp[key] = item.relativeComp[key]));
      _getRelativeComp.call(Object.values(item.relativeComp), obj)
    }
  });
  return obj;
}
function getRelativeComp (comps = {}) {
  const obj = {relativeComp: comps};
  _getRelativeComp.call(Object.values(comps), obj);
  return obj.relativeComp;
}
export default getRelativeComp;
