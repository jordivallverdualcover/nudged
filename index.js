/*

*/
exports.Transform = require('./lib/Transform')
exports.estimateI = require('./lib/estimateI')
exports.estimateT = require('./lib/estimateT')
exports.estimateS = require('./lib/estimateS')
exports.estimateR = require('./lib/estimateR')
exports.estimateTS = require('./lib/estimateTS')
exports.estimateTR = require('./lib/estimateTR')
exports.estimateSR = require('./lib/estimateSR')
exports.estimateTSR = require('./lib/estimateTSR')
exports.version = require('./lib/version')

exports.create = function (scale, rotation, tx, ty) {
  // Create a nudged.Transform instance by using more meaningful parameters
  // than directly calling 'new nudged.Transform(...)'
  //
  // Parameters:
  //   scale
  //     number, the scaling factor
  //   rotation
  //     number, rotation in radians from positive x axis towards pos. y axis.
  //   tx
  //     translation toward pos. x
  //   ty
  //     translation toward pos. y

  if (typeof scale !== 'number') { scale = 1 }
  if (typeof rotation !== 'number') { rotation = 0 }
  if (typeof tx !== 'number') { tx = 0 }
  if (typeof ty !== 'number') { ty = 0 }

  var s = scale * Math.cos(rotation)
  var r = scale * Math.sin(rotation)
  return new exports.Transform(s, r, tx, ty)
}

exports.createFromArray = function (arr) {
  // Create a nudged.Transform instance from an array that was
  // previously created with nudged.Transform#toArray().
  //
  // Together with nudged.Transform#toArray(), this method makes an easy
  // serialization and deserialization to and from JSON possible.
  //
  // Parameter:
  //   arr
  //     array with four elements

  var s = arr[0]
  var r = arr[1]
  var tx = arr[2]
  var ty = arr[3]
  return new exports.Transform(s, r, tx, ty)
}

exports.estimate = function (type, domain, range, pivot) {
  // Parameter
  //   type
  //     string. One of the following:
  //       'I', 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  //   domain
  //     array of 2d arrays
  //   range
  //     array of 2d arrays
  //   pivot
  //     optional 2d array, does nothing for translation estimators
  //
  var name = 'estimate' + type.toUpperCase()
  if (exports.hasOwnProperty(name)) {
    return exports[name](domain, range, pivot)
  } // else
  throw new Error('Unknown estimator type: ' + type)
}
