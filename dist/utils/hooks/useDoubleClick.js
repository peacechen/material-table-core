"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDoubleClick = useDoubleClick;

var _react = _interopRequireDefault(require("react"));

function useDoubleClick(singleCallback, dbCallback) {
  var countRef = _react["default"].useRef(0);
  /** Refs for the timer **/


  var timerRef = _react["default"].useRef(null);

  var inputDoubleCallbackRef = _react["default"].useRef(null);

  var inputSingleCallbackRef = _react["default"].useRef(null);

  _react["default"].useEffect(function () {
    inputDoubleCallbackRef.current = dbCallback;
    inputSingleCallbackRef.current = singleCallback;
  });

  var reset = function reset() {
    clearTimeout(timerRef.current);
    timerRef.current = null;
    countRef.current = 0;
  };

  var onClick = _react["default"].useCallback(function (e) {
    var isDoubleClick = countRef.current + 1 === 2;
    var timerIsPresent = timerRef.current;
    var timeDelay = isDoubleClick ? 250 : 0;

    if (timerIsPresent) {
      if (isDoubleClick) {
        reset();

        if (inputDoubleCallbackRef.current) {
          inputDoubleCallbackRef.current(e);
        }
      }
    }

    if (!timerIsPresent) {
      countRef.current = countRef.current + 1;
      var timer = setTimeout(function () {
        reset();

        if (inputSingleCallbackRef.current) {
          inputSingleCallbackRef.current(e);
        }
      }, timeDelay);
      timerRef.current = timer;
    }
  }, []);

  return onClick;
}