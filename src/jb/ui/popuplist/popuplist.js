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
