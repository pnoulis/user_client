function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
const
round10 = (value, exp) => decimalAdjust("round", value, exp),
Dimensions = {};
Dimensions.relativeHeight = element => {
  const
  rect = element.getBoundingClientRect(),
  parentRect = element.parentElement.getBoundingClientRect(),
  dims = {};
  /*
    Ywh: window.innerHeight: interior height of the window, including horizontal scrollbar if present
    Yph: parent.scrollHeight: height of the parent element including overflowing content and padding, but without
                              margin, border, or horizontal scrollbar
    Yeh: element.height: height of the element including padding, border width and overflow
    Yopts: element.offsetTop: distance of the outer border of the current element relative to the inner border
                              of the top of the offset parent node
    Ypts:
   */
  dims.parent = {
    Hopc: element.parentElement.scrollHeight,
    Hbop: parentRect.height,
    borT: Dimensions.get(element.parentElement, "border").borT,
    borB: Dimensions.get(element.parentElement, "border").borB,
    Yvts: parentRect.y,
    Yvte: parentRect.bottom,
    Yvbs: window.innerHeight - parentRect.bottom,
    Yvbe: window.innerHeight - parentRect.y,
  };

  dims.current = {
    Hopc: element.scrollHeight,
    Hbop: rect.height,
    borT: Dimensions.get(element, "border").borT,
    borB: Dimensions.get(element, "border").borB,
    Yts: element.offsetTop,
    Yvts: rect.y,
    Yvte: rect.bottom,
    Yvbs: Math.abs(window.innerHeight - rect.bottom),
    Yvbe: Math.abs(window.innerHeight - rect.y),
  };

  dims.current.visibleB = dims.current.Hbop > window.innerHeight ? window.innerHeight - dims.current.Yvts :
    dims.current.Hbop;
  dims.current.visibleC = dims.current.Hbop > window.innerHeight ? dims.current.visibleB - dims.current.borT :
    dims.current.visibleB - dims.current.borT - dims.current.borB;

  dims.current.Ypts = round10(dims.current.Yvts - dims.parent.Yvts - dims.parent.borT - 0.1);
  dims.current.Ypte = round10(dims.current.Yvte - dims.parent.Yvts - dims.parent.borT - 0.1);
  dims.current.Ypbs = round10(dims.current.Yvbs - dims.parent.Yvbs - dims.parent.borB - 0.1);
  dims.current.Ypbe = round10(dims.current.Yvbe - dims.parent.Yvbs - dims.parent.borB - 0.1);
  return dims.current;
},
Dimensions.relativeWidth = element => {
const
  rect = element.getBoundingClientRect(),
  parentRect = element.parentElement.getBoundingClientRect(),
  dims = {};

  dims.parent = {
    Wopc: element.parentElement.scrollHeight,
    Wbop: parentRect.height,
    borL: Dimensions.get(element.parentElement, "border").borL,
    borR: Dimensions.get(element.parentElement, "border").borR,
    Xvls: parentRect.x,
    Xvle: parentRect.right,
    Xvrs: window.innerWidth - parentRect.right,
    Xvre: window.innerWidth - parentRect.x,
  };

  dims.current = {
    Wopc: element.scrollWidth,
    Wbop: rect.width,
    Xts: element.offsetTop,
    Xvls: rect.x,
    Xvle: rect.right,
    Xvrs: window.innerWidth - rect.right,
    Xvre: window.innerWidth - rect.x,
  };

  dims.current.Xpls = round10(dims.current.Xvls - dims.parent.Xvls - dims.parent.borL - 0.1);
  dims.current.Xple = round10(dims.current.Xvle - dims.parent.Xvls - dims.parent.borL - 0.1);
  dims.current.Xprs = round10(dims.current.Xvrs - dims.parent.Xvrs - dims.parent.borR - 0.1);
  dims.current.Xpre = round10(dims.current.Xvre - dims.parent.Xvrs - dims.parent.borR - 0.1);
  return dims.current;
},

// xMarks = [], yMarks = []
Dimensions.areYpointsCrossed = (element, ...ypoints) => {
  let height = Dimensions.get(element.parentElement, "relativeHeight").Yvts;
  height += Dimensions.get(element.parentElement, "border").borT;
  for (let i = 0; i < ypoints.length; ++i) {
    if (height <= 0 && Math.abs(height) >= ypoints[i]) ypoints[i] = true;
    else ypoints[i] = false;
  }
  return ypoints;
},
Dimensions.areXpointsCrossed = (element, ...xpoints) => {
  let width = Dimensions.get(element.parentElement, "relativeWidth").Xvls;
  width += Dimensions.get(element.parentElement, "border").borL;
  for (let i = 0; i < xpoints.length; ++i) {
    if (width <= 0 && Math.abs(width) >= xpoints[i]) xpoints[i] = true;
    else xpoints[i] = false;
  }
  return xpoints;
},
Dimensions.position = element => ({
  posT: parseInt(window.getComputedStyle(element).top.replace("px", "")),
  posB: parseInt(window.getComputedStyle(element).bottom.replace("px", "")),
  posL: parseInt(window.getComputedStyle(element).left.replace("px", "")),
  posR: parseInt(window.getComputedStyle(element).right.replace("px", "")),
});
Dimensions.padding = element => ({
  padT: parseInt(window.getComputedStyle(element).paddingTop.replace("px", "")),
  padB: parseInt(window.getComputedStyle(element).paddingBottom.replace("px", "")),
  padL: parseInt(window.getComputedStyle(element).paddingLeft.replace("px", "")),
  padR: parseInt(window.getComputedStyle(element).paddingRight.replace("px", "")),
});
Dimensions.margin = element => ({
  marT: window.getComputedStyle(element).marginTop.replace("px", ""),
  marB: window.getComputedStyle(element).marginBottom.replace("px", ""),
  marL: window.getComputedStyle(element).marginLeft.replace("px", ""),
  marR: window.getComputedStyle(element).marginRight.replace("px", ""),
});
Dimensions.border = element => ({
  borT: parseInt(window.getComputedStyle(element).borderTopWidth.replace("px", "")),
  borB: parseInt(window.getComputedStyle(element).borderBottomWidth.replace("px", "")),
  borL: parseInt(window.getComputedStyle(element).borderLeftWidth.replace("px", "")),
  borR: parseInt(window.getComputedStyle(element).borderRightWidth.replace("px", "")),
});
Dimensions.height = element => ({
  offsetHeight: element.offsetHeight, // no margin
  scrollHeight: element.scrollHeight,
  clientHeight: element.clientHeight, // no border, no margin, no scrollbar
  height: window.getComputedStyle(element).height, // content box depending on
  // the box sizing property and is a string including px, "100px"
  barHeight: element.offsetHeight - element.clientHeight,
});
Dimensions.width = element => ({
  offsetWidth: element.offsetWidth, // with scrollbar
  scrollWidth: element.scrollWidth,
  clientWidth: element.clientWidth, // without scrollbar
  barWidth: element.offsetWidth - element.clientWidth,
  width: window.getComputedStyle(element).width,
});
Dimensions.window = () => ({
  outerHeight: window.outerHeight,
  innerHeight: window.innerHeight,
  outerWidth: window.outerWidth,
  innerWidth: window.innerWidth,
  scrollY: Math.round(window.scrollY),
  scrollX: Math.round(window.scrollX),
});
Dimensions.get = function(element, ...props) {
  let dimensions = {};
  props.forEach(prop => dimensions = {...dimensions, ...this[prop](element)});
  return dimensions;
};

export {Dimensions};
