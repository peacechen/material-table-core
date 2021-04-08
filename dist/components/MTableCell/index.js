"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
function MTableCell(props) {
  var handleClickCell = function handleClickCell(e) {
    if (props.columnDef.disableClick) {
      e.stopPropagation();
    }
  };

  var cellAlignment = props.columnDef.align !== undefined ? props.columnDef.align : ['numeric', 'currency'].indexOf(props.columnDef.type) !== -1 ? 'right' : 'left';
  var renderValue = (0, _utils.getRenderValue)(props);

  if (props.cellEditable) {
    renderValue = /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        borderBottom: '1px dashed grey',
        cursor: 'pointer',
        width: 'max-content'
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        props.onCellEditStarted(props.rowData, props.columnDef);
      }
    }, renderValue);
  }

  return /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
    size: props.size,
    value: props.value,
    style: (0, _utils.getStyle)(props),
    align: cellAlignment,
    onClick: handleClickCell,
    ref: props.forwardedRef,
    colSpan: props.colSpan
  }, props.children, renderValue);
}

MTableCell.defaultProps = {
  columnDef: {},
  value: undefined
};
MTableCell.propTypes = {
  columnDef: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].any,
  rowData: _propTypes["default"].object,
  errorState: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].bool]),
  forwardedRef: _propTypes["default"].element,
  size: _propTypes["default"].string,
  colSpan: _propTypes["default"].number,
  children: _propTypes["default"].element,
  cellEditable: _propTypes["default"].bool,
  onCellEditStarted: _propTypes["default"].func
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function MTableCellRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableCell, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

exports["default"] = _default;