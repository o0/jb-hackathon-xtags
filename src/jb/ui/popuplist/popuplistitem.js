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
