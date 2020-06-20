# CN Address Parse

国内地址地区智能解析，无需完整地址也能正确匹配  
如有识别不准的地址请 [issuse](https://github.com/akebe/address-parse/issues)
(更新最新地址数据如不需要请star原作者)
### Install
`npm install addres-parse-weidian --save`
### Start
````
import AddressParse from 'addres-parse-weidian';

const [result] = AddressParse.parse('福建省福州市福清市石竹街道义明综合楼3F，15000000000，asseek');
console.log(result);
/* 
{
  'province': '福建省',
  'city': '福州市',
  'area': '福清市',
  'details': '石竹街道义明综合楼3F',
  'name': 'asseek',
  'code': '350181',
  '__type': 'parseByProvince',     //结果解析使用函数 parseByProvince parseByCity parseByArea
  '__parse': true,                 //为true的结果可信度高
  'mobile': '15000000000',
  'zip_code': '',
  'phone': '',
};
*/
````

parse默认识别到第一个可信结果就会返回内容，但这不一定准确，特别是没有正确省市区的地址  
这时如果传入第二个参数会执行所有解析方法，并将所有解析内容返回  
内部有进行判断，可信度较高的地址会在数组前面
````
const [result, ...results] = AddressParse.parse('张l,15222222222,和林格尔 盛乐经济工业园区内蒙古师范大学盛乐校区', true);
import AddressParse, {AREA, Utils} from 'address-parse';

const {
  province_list,  // 以地区编码为键名的省份对象
  city_list,      // 以地区编码为键名的城市对象
  area_list,      // 以地区编码为键名的地区对象
} = AREA;

// 通过地区编码返回省市区对象
const {province, city, area, code} = Utils.getAreaByCode('350181');

// 根据省市县类型和对应的code获取数据列表 
const list = Utils.getTargetAreaListByCode('city', '350000'); //获得福建所有城市

list = Utils.getTargetAreaListByCode('area', '350000'); //获得福建所有地区

// 传入第三个参数返回code父级
const [province, city] = Utils.getTargetAreaListByCode('province', '350181', true);
const [city] = Utils.getTargetAreaListByCode('city', '350181', true);

// 非标准地区对象转换为标准地区对象
const result = Utils.getAreaByAddress({province: '福建', city: '福州', area: '福清'});
// {"code":"350181","province":"福建省","city":"福州市","area":"福清市"}