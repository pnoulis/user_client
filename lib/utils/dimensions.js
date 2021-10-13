const Dimensions = {};
// the absolute position in relation to the topmost and leftmost edge of the document
Dimensions.boundaries = element => {
  const rect = element.getBoundingClientRect();
  const boundaries = {};
  boundaries.borders = Dimensions.get(element, "border")();

  boundaries.btop = Math.round(rect.y + window.scrollY);
  boundaries.ctop = boundaries.btop + boundaries.borders.borT;
  boundaries.bbot = Math.round(rect.bottom + window.scrollY);
  boundaries.cbot = boundaries.bbot - boundaries.borders.borB;

  boundaries.bleft = Math.round(rect.x + window.scrollX);
  boundaries.cleft = boundaries.bleft + boundaries.borders.borL;
  boundaries.bright = Math.round(rect.right + window.scrollX);
  boundaries.cright = boundaries.bright - boundaries.borders.borR;

  return boundaries;
};
Dimensions.rect = element => {
  const bounding = element.getBoundingClientRect();
  const rect = {};
  rect.x = Math.round(bounding.x);
  rect.y = Math.round(bounding.y);
  rect.right = Math.round(bounding.right);
  rect.bottom = Math.round(bounding.bottom);
  rect.height = bounding.height;
  rect.width = bounding.width;
  return rect;
};
Dimensions.visible = element => {
  const rect = Dimensions.rect(element);
  const visible = {};
  visible.borders = Dimensions.get(element, "border")();
  const boundaries = Dimensions.boundaries(element);

  if (Math.round(window.scrollX) + document.documentElement.clientWidth < boundaries.bleft ||
      Math.round(window.scrollX) > boundaries.bright ||
      Math.round(window.scrollY) + document.documentElement.clientHeight < boundaries.btop ||
      Math.round(window.scrollY) > boundaries.bbot) {
    visible.by = 0;
    visible.cy = 0;
    visible.bx = 0;
    visible.cx = 0;

    visible.invisBY = rect.height;
    visible.invisCY = rect.height;
    visible.invisBX = rect.width;
    visible.invisCX = rect.width;
    return visible;
  }

  visible.by = (rect.y < 0) ? (rect.bottom < 0) ? 0 : (rect.bottom > window.innerHeight) ? window.innerHeight : window.innerHeight - (window.innerHeight - rect.bottom) : (rect.bottom < window.innerHeight) ? window.innerHeight - rect.y - (window.innerHeight - rect.bottom) : window.innerHeight - rect.y;

  rect.bottom -= visible.borders.borB;
  rect.y += visible.borders.borT;

  visible.cy = (rect.y < 0) ? (rect.bottom < 0) ? 0 : (rect.bottom > window.innerHeight) ? window.innerHeight : window.innerHeight - (window.innerHeight - rect.bottom) : (rect.bottom < window.innerHeight) ? window.innerHeight - rect.y - (window.innerHeight - rect.bottom) : window.innerHeight - rect.y;

  visible.bx = (rect.x < 0) ? (rect.right < 0) ? 0 : (rect.right > window.innerWidth) ? window.innerWidth : window.innerWidth - (window.innerWidth - rect.right) : (rect.right < window.innerWidth) ? window.innerWidth - rect.x - (window.innerWidth - rect.right) : window.innerWidth - rect.x;

  rect.right -= visible.borders.borR;
  rect.x += visible.borders.borL;

  visible.cx = (rect.x < 0) ? (rect.right < 0) ? 0 : (rect.right > window.innerWidth) ? window.innerWidth : window.innerWidth - (window.innerWidth - rect.right) : (rect.right < window.innerWidth) ? window.innerWidth - rect.x - (window.innerWidth - rect.right) : window.innerWidth - rect.x;

  visible.invisBY = rect.height - visible.by;
  visible.invisCY = (rect.height - (visible.borders.borT + visible.borders.borB)) - visible.cy;
  visible.invisBX = rect.width - visible.bx;
  visible.invisCX = (rect.width - (visible.borders.borL + visible.borders.borR)) - visible.cx;
  return visible;
};
// assumes the container has a position of static or relative
Dimensions.elementNotInContainer = (element, container) => {
  const
  Container = Dimensions.boundaries(container),
  Current  = Dimensions.boundaries(element);

  if (Current.bbot > Container.cbot) {
    return "yend";
  } else if (Current.btop < Container.ctop) {
    return "ystart";
  } else if (Current.bright > Container.cright) {
    return "xend";
  } else if (Current.bleft < Container.cleft) {
    return "xstart";
  } else {
    return false;
  }
};

Dimensions.keepWithinContainer = (element, container) => {
  const position = Dimensions.determinePositionInContainer(element, container);
  switch (Dimensions.elementNotInContainer(element, container)) {
  case "yend":
    return {position: "absolute", bottom: 0, left: position.left};
  case "ystart":
    return {position: "absolute", top: 0, left: position.left};
  case "xend":
    return {position: "absolute", right: 0, top: position.top};
  case "xstart":
    return {position: "absolute", left: 0, top: position.top};
  default:
    return null;
  }
};
Dimensions.keepWithinViewportIfSpace = (element, container) => {
  const
  viewportCrossed = Dimensions.elementNotInViewport(element),
  inContainer = Dimensions.willElementStayInContainer(element, container),
  rect = Dimensions.rect(element);

  switch (viewportCrossed) {
  case "top":
    return inContainer[0] ? {position: "fixed", left: rect.x, top: 0} : false;
  case "bottom":
    return inContainer[2] ? {position: "fixed", left: rect.x, bottom: 0} : false;
  case "left":
    return inContainer[3] ? {position: "fixed", top: rect.y, left: 0} : false;
  case "right":
    return inContainer[1] ? {position: "fixed", top: rect.y, right: 0} : false;
  default:
    return false;
  }
};

Dimensions.keepInContainerViewportBoundaries = (element, container) => {
  let Element = {}, motion = "", moving = [0, 0], position = {}, inContainer = [],
      notInViewport = "", notInContainer = "", inPosition = false,
      fixed = false, fixedSide = "", boundaries = false;
  return () => {
    if (!boundaries) boundaries = Dimensions.get(element, "position")("posL", "posT");
    moving.push(Math.round(window.scrollY), Math.round(window.scrollX));
    if (moving.length > 4) {
      moving.shift(); moving.shift();
    }
    Element = Dimensions.get(element, "rect", "position")();
    motion = Dimensions.determineMovement(moving);
    position = Dimensions.determinePositionInContainer(element, container);
    inContainer = Dimensions.willElementStayInContainer(element, container);
    notInViewport = Dimensions.elementNotInViewport(element);
    notInContainer = Dimensions.elementNotInContainer(element, container);
    fixed = Element.pos === "absolute" ? false : true;

    if (notInContainer) {
      inPosition = false;
      switch (notInContainer) {
      case "yend":
        return {position: "absolute", bottom: 0, left: position.left};
      case "ystart":
        return {position: "absolute", top: 0, left: position.left};
      case "xend":
        return {position: "absolute", right: 0, top: position.top};
      case "xstart":
        return {position: "absolute", left: 0, top: position.top};
      default:
        return false;
      }
    }

    if (notInViewport) {
      switch (notInViewport) {
      case "top":
        if (inContainer[0]) {
          inPosition = false;
          fixedSide = "top";
          return {position: "fixed", left: Element.x, top: 0};
        } else {
          return false;
        }
      case "bottom":
        if (inContainer[2]) {
          inPosition = false;
          fixedSide = "bottom";
          return {position: "fixed", left: Element.x, bottom: 0};
        } else {
          return false;
        }
      case "left":
        if (inContainer[3]) {
          inPosition = false;
          fixedSide = "left";
          return {position: "fixed", top: Element.y, left: 0};
        } else {
          return false;
        }
      case "right":
        if (inContainer[1]) {
          inPosition = false;
          fixedSide = "right";
          return {position: "fixed", top: Element.y, right: 0};
        } else {
          return false;
        }
      default:
        return false;
      }
    }

    switch (motion) {
    case "up":
      if (!fixed && position.top > boundaries.posT && inContainer[0]) {
        return {position: "fixed", top: 0, left: Element.x};
      }
      if (!inPosition && position.top < boundaries.posT && fixedSide !== "bottom") {
        inPosition = true;
        return {position: "absolute", top: boundaries.posT, left: position.left};
      }
      break;
    case "down":
      if (!fixed && position.top < boundaries.posT && inContainer[2]) {
        return {position: "fixed", bottom: 0, left: Element.x};
      }
      if (!inPosition && position.top > boundaries.posT && fixedSide !== "top") {
        inPosition = true;
        return {position: "absolute", top: boundaries.posT, left: position.left};
      }
      break;
    case "left":
      if (!fixed && position.left > boundaries.posL && inContainer[3]) {
        return {position: "fixed", left: 0, top: Element.y};
      }

      if (!inPosition && position.left - 10 < boundaries.posL && fixedSide !== "right") {
        inPosition = true;
        return {position: "absolute", left: boundaries.posL, top: position.top};
      }
      break;
    case "right":
      if (!fixed && position.left < boundaries.posL && inContainer[1]) {
        return {position: "fixed", right: 0, top: Element.y};
      }
      if (!inPosition && position.left + 10 > boundaries.posL && fixedSide !== "left") {
        inPosition = true;
        return {position: "absolute", left: boundaries.posL, top: position.top};
      }
      break;
    default:
      return false;
    }
  };
};
Dimensions.determinePositionInContainer = (element, container) => {
  const Container = Dimensions.boundaries(container),
  Current = Dimensions.rect(element);
  Current.top = Math.abs(Math.round(
    (Container.ctop - window.scrollY) - Current.y
  ));
  Current.left = Math.abs(Math.round(
    (Container.cleft - window.scrollX) - Current.x
  ));
  return {top: Current.top, left: Current.left};
};
// covers the case where an element is not in the viewport
// but fixing it to the document will exceed its container
Dimensions.willElementStayInContainer = (element, container) => {
  const
  Container = Dimensions.get(container, "boundaries")(),
  Element = Dimensions.get(element, "rect")(),
  scrollY = Math.round(window.scrollY),
  scrollX = Math.round(window.scrollX),
  cH = document.documentElement.clientHeight, // clientHeight
  cW = document.documentElement.clientWidth, // clientWidth
  fixit = [];

  // just like css, so when lets say the element will exceed the container from the left hand side
  // then fixit[3] will be set to true
  // top
  fixit[0] = (scrollY > Container.ctop && scrollY + Element.height < Container.cbot) ? true : false;
  // right
  fixit[1] = (scrollX + cW < Container.cright && scrollX + cW > Container.cleft + Element.width) ? true : false;
  // bottom
  fixit[2] = (scrollY + cH < Container.cbot && scrollY + cH > Container.ctop + Element.height) ? true : false;
  // left
  fixit[3] = (scrollX > Container.cleft && scrollX + Element.width < Container.cright) ? true : false;

  return fixit;
};

Dimensions.elementNotInViewport = (element, partial) => {
  const rect = Dimensions.rect(element);
  if (rect.y  < (partial ? -element.offsetHeight : 0)) {
    return "top";
  } else if (rect.bottom > window.innerHeight + (partial ? element.offsetHeight : 0)) {
    return "bottom";
  } else if (rect.x < (partial ? -element.offsetWidth : 0)) {
    return "left";
  } else if (rect.right > window.innerWidth + (partial ? element.offsetWidth : 0)) {
    return "right";
  } else {
    return false;
  }
};

// needs an array of length 4 populated by window.scrollY, window.scrollX values in the order
// [window.scrollY, window.scrollX, window.scrollY, window.scrollX]
Dimensions.determineMovement = (scrollDistances) => {
  if (scrollDistances[0] > scrollDistances[2]) {
    return "up";
  } else if (scrollDistances[0] < scrollDistances[2]) {
    return "down";
  } else if (scrollDistances[1] > scrollDistances[3]) {
    return "left";
  } else if (scrollDistances[1] < scrollDistances[3]) {
    return "right";
  } else {
    return false;
  }
};
Dimensions.position = element => ({
  pos: window.getComputedStyle(element).position,
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
  Hsbop: element.offsetHeight,
  Hop: element.scrollHeight,
  barHeight: element.offsetHeight - Dimensions.get(element, "border").borB,
});
Dimensions.width = element => ({
  Wsbop: element.offsetWidth,
  Wop: element.scrollWidth,
  barWidth: element.offsetWidth - Dimensions.get(element, "border").borR,
});
Dimensions.document = () => ({
  Hsbop: window.document.body.offsetHeight,
  Hop: window.document.body.scrollHeight,
  Wsbop: window.document.body.offsetWidth,
  Wop: window.document.body.scrollWidth,
});
Dimensions.window = () => ({
  outerHeight: window.outerHeight,
  innerHeight: window.innerHeight,
  outerWidth: window.outerWidth,
  innerWidth: window.innerWidth,
  scrollY: Math.round(window.scrollY),
  scrollX: Math.round(window.scrollX),
  heightNoScrollbar: document.documentElement.clientHeight,
  widthNoScrollbar: document.documentElement.clientWidth,
});
Dimensions.get = function(element, ...props) {
  let dimensions = {};
  props.forEach(prop => dimensions = {...dimensions, ...this[prop](element)});
  return (...args) => {
    if (!args.length) return dimensions;
    let reduce = {};
    args.forEach(prop => reduce[prop] = dimensions[prop]);
    return args.length < 2 ? reduce[args[0]] : reduce;
  };
};

export {Dimensions};
