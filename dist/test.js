'use strict';

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _utils = require('./parse/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); } /**
                                                                               * address-parse
                                                                               * MIT License
                                                                               * By www.asseek.com
                                                                               */


//const Parse = require('address-parse').default;

// 测试地址 规则更新需要确保这里面的地址可以被正确解析
var list = [['福建省福州市福清市石竹街道义明综合楼3F，15000000000，asseek', '350181'], ['广东省东莞市寮步镇，15000000000，asseek', '350181'], ['广东省东莞市石碣镇，15000000000，asseek', '350181'], ['广东省东莞市清溪镇，15000000000，asseek', '350181'], ['河南省周口市淮阳县，15000000000，asseek', '350181']];

var index = 0;
var isSuccess = true;
console.time('解析耗时');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var v = _step.value;

    index += 1;
    var address = Array.isArray(v) ? v[0] : v;
    var code = Array.isArray(v) ? v[1] : '';
    //let [result, ...results] = Parse.parse(address, true);

    var _Parse$parse = _parse2.default.parse(address),
        _Parse$parse2 = _toArray(_Parse$parse),
        result = _Parse$parse2[0],
        results = _Parse$parse2.slice(1);

    var status = code ? result.code === code : result.__parse;
    if (!status) isSuccess = false;
    //console.log(index, code ? result.code === code : !!result.area, result, results);
    console.log(index, code ? result.code === code : result.__parse, result);
    //console.log(index, code ? result.code === code : !!result.area);
    console.log(_utils2.default.getTargetAreaListByCode('province', result.code, true));
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

console.timeEnd('解析耗时');
console.log('\u89E3\u6790\u7ED3\u679C: ' + (isSuccess ? '通过' : '失败'));