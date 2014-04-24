(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @fileoverview
 * @author igor.alexeenko (Igor Alekseyenko)
 */

module.exports = {
  comboboxData: [
    'First element',
    'Second element',
    'Third element',
    'Some element',
    'Element some',
    'Last element'
  ]
};

},{}],2:[function(require,module,exports){
/**
* @fileoverview Combobox element.
* @author igor.alexeenko (Igor Alekseyenko)
*/

require('../popuplist/popuplist.js');
var data = require('../../data/data.js');

/**
 * @const
 * @type {string}
 */
var DEFAULT_CAPTION = 'Default text';

/**
 * @enum {string}
 */
var ClassName = {
  ARROW: 'jb-combobox-arrow',
  BASE: 'jb-combobox',
  INPUT: 'jb-combobox-input'
};

xtag.register('jb-combobox', {
  lifecycle: {
    created: function() {
      var template = document.getElementById('jb-combobox-template').content;
      this.appendChild(template.cloneNode(true));

      this.classList.add(ClassName.BASE);

      this.inputElement_ = this.getElementsByClassName(ClassName.INPUT)[0];
      this.arrowElement_ = this.getElementsByClassName(ClassName.ARROW)[0];
      this.popupElement_ = document.createElement('jb-popuplist');

      this.setCaption_();
    },
    inserted: function() {
      this.popupElement_.anchorElement = this.inputElement_;
      document.body.appendChild(this.popupElement_);

      this.appendChild(this.popupElement_);
    },
    removed: function() {},
    attributeChanged: function() {}
  },

  accessors: {
    caption: {
      /**
       * @param {string} caption
       */
      set: function(caption) {
        this.setCaption_(caption);
      }
    }
  },

  methods: {
    /**
     * @param {string=} opt_caption
     * @private
     */
    setCaption_: function(opt_caption) {
      this.inputElement_.placeholder = opt_caption || DEFAULT_CAPTION;
    }
  }
});

},{"../../data/data.js":1,"../popuplist/popuplist.js":4}],3:[function(require,module,exports){
/**
 * @fileoverview Popup, which is able to be bound to some element. Otherwise,
 * shows in the middle of the screen.
 * @author igor.alexeenko (Igor Alekseyenko)
 */

var jb = jb || {};

jb.screen = require('../../../utils.js');

/**
 * @enum {string}
 */
var ClassName = {
  BASE: 'jb-popup'
};

xtag.register('jb-popup', {
  lifecycle: {
    created: function() {
      this.classList.add(ClassName.BASE);
    },
    inserted: function() {
      if (this.anchorElement_) {
        var anchorElementPosition = jb.screen.getElementAngleCoordinate(
            this.anchorElement_,
            jb.screen.Angle.BOTTOM_LEFT);

        this.style.left = anchorElementPosition.x + 'px';
        this.style.top = anchorElementPosition.y + 'px';

        this.resizeHandler_ = xtag.addEvent(window, 'resize',
            this.onWindowResize_.bind(this));
      } else {
        // todo: Place element in the middle of the screen.
      }
    },
    removed: function() {
      xtag.removeEvent(window, 'resize', this.resizeHandler_);
    },
    attributeChanged: function() {}
  },
  events: {},
  accessors: {
    'anchorElement': {
      /**
       * @param {Element} element
       */
      set: function(element) {
        this.anchorElement_ = element;
      }
    }
  },
  methods: {
    /**
     * @param {Event} evt
     * @private
     */
    onWindowResize_: function(evt) {
      if (this.parentElement !== null) { // todo: xtag.removeEvent doesn't work.
        this.parentElement.removeChild(this);
      }
    }
  }
});

},{"../../../utils.js":7}],4:[function(require,module,exports){
/**
 * @fileoverview Popup, which behaves like a list of elements.
 * @author igor.alexeenko (Igor Alekseyenko)
 */

require('../popup/popup.js');
require('./popuplistitem.js');

var popupElement = document.createElement('jb-popup');
var superClass = popupElement.__proto__;

xtag.register('jb-popuplist', {
  prototype: Object.create(popupElement.__proto__),
  lifecycle: {
    created: function() {
      /**
       * @type {Array.<Element>}
       * @private
       */
      this.items_ = [];

      /**
       * @type {Array.<Element>}
       * @private
       */
      this.selectedItems_ = [];

      superClass.createdCallback.apply(this, arguments);
    }
  },
  events: {
    /**
     * @param {MouseEvent} evt
     */
    'click': function(evt) {

    }
  },
  accessors: {
    items: {
      /**
       * @param {Array.<string>} itemsList
       */
      set: function(itemsList) {
        debugger;

        itemsList.forEach(function(item) {
          var popupListItem = document.createElement('jb-popuplist-item');
          popupListItem.caption = item;
          this.items_.push(popupListItem);
          this.appendChild(popupListItem);
        }, this);
      }
    }
  },
  methods: {
    isChild: function(element) {

    }
  }
});

},{"../popup/popup.js":3,"./popuplistitem.js":5}],5:[function(require,module,exports){
/**
 * @fileoverview Item of popuplist.
 * @author igor.alexeenko (Igor Alekseyenko)
 */

/**
 * @enum {string}
 */
var ClassName = {
  SELECTED: 'jb-popuplist-item-selected',
  HOVERED: 'jb-popuplist-item-hovered'
};

xtag.register('jb-popuplist-item', {
  events: {
    /**
     * @param {MouseEvent} evt
     */
    'mouseover': function(evt) {
      this.hovered = true;
    },

    'mouseout': function(evt) {
      this.hovered = false;
    }
  },
  accessors: {
    'caption': {
      /**
       * @param {string} caption
       */
      set: function(caption) {
        this.innerHTML = caption;
      }
    },

    'selected': {
      /**
       * @param {boolean} selected
       */
      set: function(selected) {
        this.classList.toggle(ClassName.SELECTED, selected);
      }
    },

    'hovered': {
      /**
       * @param {boolean} hovered
       */
      set: function(hovered) {
        this.classList.toggle(ClassName.HOVERED, hovered);
      }
    }
  }
});

},{}],6:[function(require,module,exports){
/**
 * @fileoverview App entry point
 * @author igor.alexeenko (Igor Alekseyenko)
 */

var jb = {};

require('./jb/ui/combobox/combobox.js');
require('./utils.js');

/**
 * @public
 * @static
 * @return {void}
 * @constructor
 */
var Main = function() {
  var layoutElement = document.getElementsByClassName('layout')[0];
  var comboBoxElement = document.createElement('jb-combobox');

  layoutElement.appendChild(comboBoxElement);
};

window.Main = Main;
 
},{"./jb/ui/combobox/combobox.js":2,"./utils.js":7}],7:[function(require,module,exports){
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


},{}]},{},[6])