import parseObjectToTreeTools from "./parseObjectToTreeTools";
const {getAllVal} = parseObjectToTreeTools;

const valTypeMap = {
  49: "string",
  50: "number",
  51: "boolean",
  52: "array",
  53: "object",
};
const valShortCutFn = {
  prevItem(scope){
    const {conf, parent, popConf} = scope;
    const index = parent.val.indexOf(conf);
    if (index > 0) {
      popConf.focusItem = parent.val[index - 1];
    }
    ev.stopPropagation();
  },
  nextItem(scope, ev){
    const {conf, parent, popConf} = scope;
    const index = parent.val.indexOf(conf);
    const maxLen = parent.val.length;
    if (index < maxLen - 1) {
      popConf.focusItem = parent.val[index + 1];
    }
    ev.stopPropagation();
  },
  addItem(scope, ev){
    const {conf, parent, popConf} = scope;
    const index = parent.val.indexOf(conf);
    const valType= "string";
    const val = "";
    const values =getAllVal(valType, val);
    parent.val.splice(index + 1, 0, {values, key: index + 1, val, valType});
    popConf.focusItem = parent.val[index + 1];
    parent.valType === "array" && parent.val.forEach((item, index) => (item.key = index));
    ev.stopPropagation();
  },
  removeItem(scope, ev){
    if (!ev.target.value || !ev.target.value.length) {
      const {conf, parent, popConf} = scope;
      const index = parent.val.indexOf(conf);
      index ? parent.val.splice(index, 1) : (conf);
      popConf.focusItem = parent.val[index] || parent.val[index - 1];
      parent.valType === "array" && parent.val.forEach((item, index) => (item.key = index));
      ev.stopPropagation();
      ev.preventDefault();
    }
  },
  setInputVal(scope, ev){
    const {conf, parent, popConf} = scope;
    if (conf.valType === "boolean") {
      conf.val = !conf.val;
    }
  },
  changeValType(scope, ev){
    const {conf, parent, popConf} = scope;
    const type = valTypeMap[ev.which];
    if (type) {
      conf.valType = type;
      conf.val = conf.values[type];
      console.log(type)
    }
    popConf.focusItem = null;
    scope.nextTick = e => {
      popConf.focusItem = conf;
    };
    // console.log(conf, parent, popConf);
    // valShortCut 49
  },
  focusKeyInput(scope){
    scope.$refs.key.focus();
  },
  handelTab(scope, ev){
    const oriVal =  ev.target.value;
    const start = ev.target.selectionStart;
    const startStr = oriVal.slice(0, start);
    const endStr = oriVal.slice(ev.target.selectionEnd, oriVal.length);
    try {
      ev.target.value = startStr + `  ` + endStr;
      ev.target.setSelectionRange(start+2, start + 2);
    } catch (e) {}
    ev.stopPropagation();
    ev.preventDefault();
  },
};

const altKeyFn = {
  37: valShortCutFn.focusKeyInput,
  49: valShortCutFn.changeValType,
  50: valShortCutFn.changeValType,
  51: valShortCutFn.changeValType,
  52: valShortCutFn.changeValType,
  53: valShortCutFn.changeValType,
};
const shiftKeyFn = {};
const ctrlKeyFn = {};
const shortFn = {
  8: valShortCutFn.removeItem,
  9: valShortCutFn.handelTab,
  13: valShortCutFn.addItem,
  30: valShortCutFn.prevItem,
  37: valShortCutFn.setInputVal,
  39: valShortCutFn.setInputVal,
  40: valShortCutFn.nextItem,
};
export default function valShortCut(ev, scope) {
  console.log(ev.which)
  if (ev.shiftKey) {
    const fn = shiftKeyFn[ev.which];
    fn && fn(scope, ev);
  } if (ev.ctrlKey) {
    const fn = ctrlKeyFn[ev.which];
    fn && fn(scope, ev);
  } if (ev.altKey) {
    const fn = altKeyFn[ev.which];
    fn && fn(scope, ev);
  } else {
    const fn = shortFn[ev.which];
    fn && fn(scope, ev);
  }
}
