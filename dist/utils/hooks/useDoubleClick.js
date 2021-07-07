'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.useDoubleClick = useDoubleClick;

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);

var _react = _interopRequireDefault(require('react'));

function useDoubleClick(singleCallback, dbCallback) {
  /** callback ref Pattern **/
  var _React$useState = _react['default'].useState(null),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    elem = _React$useState2[0],
    setElem = _React$useState2[1];

  var callbackRef = _react['default'].useCallback(function (node) {
    setElem(node);
    callbackRef.current = node;
  }, []);

  var countRef = _react['default'].useRef(0);
  /** Refs for the timer **/

  var timerRef = _react['default'].useRef(null);

  var inputDoubleCallbackRef = _react['default'].useRef(null);

  var inputSingleCallbackRef = _react['default'].useRef(null);

  _react['default'].useEffect(function () {
    inputDoubleCallbackRef.current = dbCallback;
    inputSingleCallbackRef.current = singleCallback;
  });

  _react['default'].useEffect(
    function () {
      function handler(e) {
        var isDoubleClick = countRef.current + 1 === 2;
        var timerIsPresent = timerRef.current;

        if (timerIsPresent && isDoubleClick) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
          countRef.current = 0;

          if (inputDoubleCallbackRef.current) {
            inputDoubleCallbackRef.current(e);
          }
        }

        if (!timerIsPresent) {
          countRef.current = countRef.current + 1;
          var timer = setTimeout(function () {
            clearTimeout(timerRef.current);
            timerRef.current = null;
            countRef.current = 0;

            if (inputSingleCallbackRef.current) {
              inputSingleCallbackRef.current(e);
            }
          }, 200);
          timerRef.current = timer;
        }
      }

      if (elem) {
        elem.addEventListener('click', handler);
      }

      return function () {
        if (elem) {
          elem.removeEventListener('click', handler);
        }
      };
    },
    [elem]
  );

  return [callbackRef, elem];
}
