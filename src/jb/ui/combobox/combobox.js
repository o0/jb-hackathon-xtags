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
