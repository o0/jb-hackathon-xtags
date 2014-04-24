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
 