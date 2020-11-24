### 这是一个 JavaScript 的工具函数库,用于收集在工作中常用的一些工具函数

## 安装
`npm install tools-fucs`

`yarn add tools-fucs `

## 使用 

#### 节流函数

`import {throttle} from 'tools-fucs'`

`throttle(fn,interval)`

#### 防抖函数

`import {debounce} from 'tools-fucs'`

`debounce(fn,interval)`

#### 深克隆

`import {deepClone} from 'tools-fucs'`

`const cloneObject = deepClone(object)`

#### 日期格式化

`import 'tools-fucs'`

`const formatDate = new Date().format('YYYY-MM-DD')` //已挂载在Date原型上

##### 目前支出的格式化方式如下:
 以 2019-06-01T18:06:08 为例
| 符号 | 结果
| :--- | :---- 
| yyyy/YYYY | 2019
| yy/YY     | 19
| MM        | 09
| M         | 9
| dd/DD     | 01
| d/D       | 1
| hh/HH     | 18
| h/H       | 6
| mm        | 06
| m         | 6
| ss/SS     | 08
| s/s       | 8

#### guid

`import {newGuid} from 'tools-fucs'`

`const newGuid = newGuid()`

#### 生成指定范围内的随机数

`import {createRandom} from 'tools-fucs'`

`const newGuid = createRandom(10,100)`