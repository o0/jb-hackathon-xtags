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
