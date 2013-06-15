// Generated by CoffeeScript 1.4.0
/*
    @author DPR http://davidpaulrosser.co.uk
*/

var nodes, stylus;

stylus = require('stylus');

nodes = stylus.nodes;

/*
*   base64 encodes a string
*
*   @param  {String} url
*   @return {Literal}
*   @api     public
*/


exports.base64 = function(str) {
  return new nodes.Literal(new Buffer(str.val).toString('base64'));
};

/*
*   Adds default behavior to the url function
*
*   @param  {String} url
*   @return {Literal}
*   @api     public
*/


exports.url = function(url) {
  return new nodes.Literal('url(' + new nodes.String(url.val) + ')');
};

/*
*   Remove the 'e' precision from a floating point number
*   
*   @param  {float} num
*   @return {Unit}
*   @api     public
*/


exports.remove_precision_e = function(num) {
  var index, result, str;
  str = String(num.val);
  index = str.indexOf('e-');
  result = null;
  if (index !== -1) {
    result = str.substr(0, index);
  } else {
    result = num.val;
  }
  return new nodes.Unit(parseFloat(result));
};