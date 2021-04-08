"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MTableHeader = MTableHeader;
exports["default"] = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableSortLabel = _interopRequireDefault(require("@material-ui/core/TableSortLabel"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _core = require("@material-ui/core");

var CommonValues = _interopRequireWildcard(require("../../utils/common-values"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MTableHeader(props) {
  var _React$useState = _react["default"].useState(function () {
    return {
      lastX: 0,
      resizingColumnDef: undefined
    };
  }),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  (0, _react.useEffect)(function () {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return function () {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  var handleMouseDown = function handleMouseDown(e, columnDef) {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      lastAdditionalWidth: columnDef.tableData.additionalWidth,
      lastX: e.clientX,
      resizingColumnDef: columnDef
    }));
  };

  var handleMouseMove = function handleMouseMove(e) {
    if (!state.resizingColumnDef) {
      return;
    }

    var additionalWidth = state.lastAdditionalWidth + e.clientX - state.lastX;
    additionalWidth = Math.min(state.resizingColumnDef.maxWidth || additionalWidth, additionalWidth);

    if (state.resizingColumnDef.tableData.additionalWidth !== additionalWidth) {
      props.onColumnResized(state.resizingColumnDef.tableData.id, additionalWidth);
    }
  };

  var handleMouseUp = function handleMouseUp(e) {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      resizingColumnDef: undefined
    }));
  };

  var renderActionsHeader = function renderActionsHeader() {
    var localization = _objectSpread(_objectSpread({}, MTableHeader.defaultProps.localization), props.localization);

    var width = CommonValues.actionsColumnWidth(props);
    return /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      key: "key-actions-column",
      padding: "checkbox",
      className: props.classes.header,
      style: _objectSpread(_objectSpread({}, props.headerStyle), {}, {
        width: width,
        textAlign: 'center',
        boxSizing: 'border-box'
      })
    }, /*#__PURE__*/_react["default"].createElement(_TableSortLabel["default"], {
      hideSortIcon: true,
      disabled: true
    }, localization.actions));
  };

  var getCellStyle = function getCellStyle(columnDef) {
    var width = CommonValues.reducePercentsInCalc(columnDef.tableData.width, props.scrollWidth);

    var style = _objectSpread(_objectSpread(_objectSpread({}, props.headerStyle), columnDef.headerStyle), {}, {
      boxSizing: 'border-box',
      width: width,
      maxWidth: columnDef.maxWidth,
      minWidth: columnDef.minWidth
    });

    if (props.options.tableLayout === 'fixed' && props.options.columnResizable && columnDef.resizable !== false) {
      style.paddingRight = 2;
    }

    return style;
  };

  function renderHeader() {
    var size = props.options.padding === 'default' ? 'medium' : 'small';
    var mapArr = props.columns.filter(function (columnDef) {
      return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
    }).sort(function (a, b) {
      return a.tableData.columnOrder - b.tableData.columnOrder;
    }).map(function (columnDef, index) {
      var content = columnDef.title;

      if (props.draggable) {
        content = /*#__PURE__*/_react["default"].createElement(_reactBeautifulDnd.Draggable, {
          key: columnDef.tableData.id,
          draggableId: columnDef.tableData.id.toString(),
          index: index
        }, function (provided, snapshot) {
          return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
            ref: provided.innerRef
          }, provided.draggableProps, provided.dragHandleProps), columnDef.title);
        });
      }

      if (columnDef.sorting !== false && props.sorting) {
        content = /*#__PURE__*/_react["default"].createElement(_TableSortLabel["default"], {
          IconComponent: props.icons.SortArrow,
          active: props.orderBy === columnDef.tableData.id,
          direction: props.orderDirection || 'asc',
          onClick: function onClick() {
            var orderDirection = columnDef.tableData.id !== props.orderBy ? props.orderDirection || 'asc' // use the current sort order when switching columns if defined
            : props.orderDirection === 'asc' ? 'desc' : props.orderDirection === 'desc' && props.thirdSortClick ? '' : props.orderDirection === 'desc' && !props.thirdSortClick ? 'asc' : props.orderDirection === '' ? 'asc' : 'desc';
            props.onOrderChange(columnDef.tableData.id, orderDirection);
          }
        }, content);
      }

      if (columnDef.tooltip) {
        content = /*#__PURE__*/_react["default"].createElement(_core.Tooltip, {
          title: columnDef.tooltip,
          placement: "bottom"
        }, /*#__PURE__*/_react["default"].createElement("span", null, content));
      }

      if (props.options.tableLayout === 'fixed' && props.options.columnResizable && columnDef.resizable !== false) {
        content = /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            flex: 1
          }
        }, content), /*#__PURE__*/_react["default"].createElement("div", null), /*#__PURE__*/_react["default"].createElement(props.icons.Resize, {
          style: {
            cursor: 'col-resize',
            color: state.resizingColumnDef && state.resizingColumnDef.tableData.id === columnDef.tableData.id ? props.theme.palette.primary.main : 'inherit'
          },
          onMouseDown: function onMouseDown(e) {
            return handleMouseDown(e, columnDef);
          }
        }));
      }

      var cellAlignment = columnDef.align !== undefined ? columnDef.align : ['numeric', 'currency'].indexOf(columnDef.type) !== -1 ? 'right' : 'left';
      return /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
        key: columnDef.tableData.id,
        align: cellAlignment,
        className: props.classes.header,
        style: getCellStyle(columnDef),
        size: size
      }, content);
    });
    return mapArr;
  }

  function renderSelectionHeader() {
    var selectionWidth = CommonValues.selectionMaxWidth(props, props.treeDataMaxLevel);
    return /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      padding: "none",
      key: "key-selection-column",
      className: props.classes.header,
      style: _objectSpread(_objectSpread({}, props.headerStyle), {}, {
        width: selectionWidth
      })
    }, props.showSelectAllCheckbox && /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], (0, _extends2["default"])({
      indeterminate: props.selectedCount > 0 && props.selectedCount < props.dataCount,
      checked: props.dataCount > 0 && props.selectedCount === props.dataCount,
      onChange: function onChange(event, checked) {
        return props.onAllSelected && props.onAllSelected(checked);
      }
    }, props.options.headerSelectionProps)));
  }

  function renderDetailPanelColumnCell() {
    return /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
      padding: "none",
      key: "key-detail-panel-column",
      className: props.classes.header,
      style: _objectSpread({}, props.headerStyle)
    });
  }

  function render() {
    var headers = renderHeader();

    if (props.hasSelection) {
      headers.splice(0, 0, renderSelectionHeader());
    }

    if (props.showActionsColumn) {
      if (props.actionsHeaderIndex >= 0) {
        var endPos = 0;

        if (props.hasSelection) {
          endPos = 1;
        }

        headers.splice(props.actionsHeaderIndex + endPos, 0, renderActionsHeader());
      } else if (props.actionsHeaderIndex === -1) {
        headers.push(renderActionsHeader());
      }
    }

    if (props.hasDetailPanel && props.options.showDetailPanelIcon) {
      if (props.detailPanelColumnAlignment === 'right') {
        headers.push(renderDetailPanelColumnCell());
      } else {
        headers.splice(0, 0, renderDetailPanelColumnCell());
      }
    }

    if (props.isTreeData > 0) {
      headers.splice(0, 0, /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
        padding: "none",
        key: 'key-tree-data-header',
        className: props.classes.header,
        style: _objectSpread({}, props.headerStyle)
      }));
    }

    props.columns.filter(function (columnDef) {
      return columnDef.tableData.groupOrder > -1;
    }).forEach(function (columnDef) {
      headers.splice(0, 0, /*#__PURE__*/_react["default"].createElement(_TableCell["default"], {
        padding: "checkbox",
        key: 'key-group-header' + columnDef.tableData.id,
        className: props.classes.header
      }));
    });
    return /*#__PURE__*/_react["default"].createElement(_TableHead["default"], {
      ref: props.forwardedRef
    }, /*#__PURE__*/_react["default"].createElement(_TableRow["default"], null, headers));
  }

  return render();
}

MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: false,
  headerStyle: {},
  selectedCount: 0,
  sorting: true,
  localization: {
    actions: 'Actions'
  },
  orderBy: undefined,
  orderDirection: 'asc',
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: 'left',
  draggable: true,
  thirdSortClick: true
};
MTableHeader.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  dataCount: _propTypes["default"].number,
  hasDetailPanel: _propTypes["default"].bool.isRequired,
  detailPanelColumnAlignment: _propTypes["default"].string,
  hasSelection: _propTypes["default"].bool,
  headerStyle: _propTypes["default"].object,
  localization: _propTypes["default"].object,
  selectedCount: _propTypes["default"].number,
  sorting: _propTypes["default"].bool,
  onAllSelected: _propTypes["default"].func,
  onOrderChange: _propTypes["default"].func,
  orderBy: _propTypes["default"].number,
  orderDirection: _propTypes["default"].string,
  actionsHeaderIndex: _propTypes["default"].number,
  showActionsColumn: _propTypes["default"].bool,
  showSelectAllCheckbox: _propTypes["default"].bool,
  draggable: _propTypes["default"].bool,
  thirdSortClick: _propTypes["default"].bool,
  tooltip: _propTypes["default"].string
};

var styles = function styles(theme) {
  return {
    header: {
      // display: 'inline-block',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: theme.palette.background.paper // Change according to theme,

    }
  };
};

exports.styles = styles;

var MTableHeaderRef = /*#__PURE__*/_react["default"].forwardRef(function MTableHeaderRef(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(MTableHeader, (0, _extends2["default"])({}, props, {
    forwardedRef: ref
  }));
});

var _default = (0, _withStyles["default"])(styles, {
  withTheme: true
})(MTableHeaderRef);

exports["default"] = _default;