/**
 * @fileoverview Utility methods
 * @author igor.alexeenko (Igor Alekseyenko)
 */
 
var jb = jb || {};

jb.screen = {};

/**
 * @enum {number}
 */
jb.screen.Angle = {
  TOP_LEFT: 0,
  TOP_RIGHT: 1,
  BOTTOM_RIGHT: 2,
  BOTTOM_LEFT: 3
};

/**
 * @param {Element} element
 * @return {{x: number, y: number}}
 */
jb.screen.getElementAbsolutePosition = function(element) {
  var x = 0;
  var y = 0;

  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    x += element.offsetLeft - element.scrollLeft;
    y += element.offsetTop - element.scrollTop;

    element = /** @type {Element} */ (element.parentNode);
  }

  return { x: x, y: y };
};

/**
 * @param {Element} element
 * @param {jb.screen.Angle} angle
 * @return {{x: number, y: number}}
 */
jb.screen.getElementAngleCoordinate = function(element, angle) {
  var elementOffset = jb.screen.getElementAbsolutePosition(element);

  switch (angle) {
    case jb.screen.Angle.BOTTOM_LEFT:
      return {
        x: elementOffset.x,
        y: elementOffset.y + element.clientHeight
      };
    // todo: The rest of angles.
    default:
      return elementOffset;
  }
};

module.exports = jb.screen;

