/**
 * address-parse
 * MIT License
 * By www.asseek.com
 */
import Parse from './parse';
import uni from './parse/utils';

//const Parse = require('address-parse').default;

// 测试地址 规则更新需要确保这里面的地址可以被正确解析
const list = [
  // ['江西省南昌市南昌经济技术开发区，15000000000，asseek'],
  ['山西省, 长治市,长治县，15000000000，asseek'],
  // ['四川省成都市高新区，15000000000，asseek'],
  // ['岳阳经济技术开发区'],
]
let index = 0;
let isSuccess = true;
console.time('解析耗时');
for (let v of list) {
  index += 1;
  let address = Array.isArray(v) ? v[0] : v;
  let code = Array.isArray(v) ? v[1] : '';
  //let [result, ...results] = Parse.parse(address, true);
  let [result, ...results] = Parse.parse(address);
  let status = code ? result.code === code : result.__parse;
  if (!status) isSuccess = false;
  //console.log(index, code ? result.code === code : !!result.area, result, results);
  console.log(index, code ? result.code === code : result.__parse, result);
  //console.log(index, code ? result.code === code : !!result.area);
  console.log(uni.getTargetAreaListByCode('province', result.code, true));
}

console.timeEnd('解析耗时');
console.log(`解析结果: ${isSuccess ? '通过' : '失败'}`);
