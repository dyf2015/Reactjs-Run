## 一、React相关脚手架
#### 1、入门学习脚手架（ES6、React）

##### （1）安装 [nodejs](https://nodejs.org/en/ "Title")

* 借助nodejs进行前端模块化项目构建，所以需要在开发环境先安装

##### （2）下载此项目并通过cmd 到工程下（01.react）并输入：npm install

* 部分windows环境需要先执行 npm install webpack -g ，不然会出现无法找到命令的问题

##### （3）执行打包命令：webpack

* 执行后生成可运行文件run.js

##### （4）打开index.html即可看到运行结果

* 本示例供初学者入门使用，使用记得star，谢谢！

---

#### 2、生产环境脚手架（ES6、React、Router、Redux）

##### （1）安装方式与入门脚手架的（1）~（2）相同

##### （2）【推荐方式】仅热编译、热部署（mode='release'）
* 打包命令：webpack --watch
* 打包配置：

参数 | 说明
---|---
entry | 前端源码位置，注意此位置必须在脚手架目录内
output | 编译后可运行js文件位置，通常是你生产环境位置
styleUrl | 编译后后可运行css文件位置，通常是你生产环境的位置
outputlib | webpack打包后的js都是一个大的闭包，如果需要将某些API暴露，则配置此参数即可
ismobile | 是否是mobile应用，不填则默认为否

* 其它webpack配置（只需了解）

参数 | 说明
---|---
externals | 将某些库踢出打包后的js，使之能在全局引入，并且webpack会自动去除相关代码
.babelrc | 存放babel插件的配置，用于es6、jsx等等

* 移动端发布环境html、JSP（放于ecology）：
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MobileDemo</title>
  <script>
    (function (baseFontSize, fontscale) {
      var _baseFontSize = baseFontSize || 100;
      var _fontscale = fontscale || 1;
      var win = window;
      var doc = win.document;
      var ua = navigator.userAgent;
      var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
      var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
      var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
      var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
      var dpr = win.devicePixelRatio || 1;
      if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
      }
      var scale = 1 / dpr;

      var metaEl = doc.querySelector('meta[name="viewport"]');
      if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        doc.head.appendChild(metaEl);
      }
      metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
      doc.documentElement.style.fontSize = _baseFontSize / 2 * dpr * _fontscale + 'px';
      window.viewportScale = dpr;
    })();
  </script>
  <link rel="stylesheet" href="index.css"/>
</head>
<body>

<div id="container"></div>
<script src="/cloudstore/resource/index.js" type="text/javascript" charset="utf-8"></script>
<srcpit>
var data = [ 
{name: "homepagejs",type: "js",version: "v1.0.0",url: "/portal/project/index.js"},
{name: "homepagecss",type: "css",version: "v1.0.0",url: "/portal/project/index.css"}
];
LS.load(data);

/* 
以上js脚本是localStorage缓存方案：
其中react、react-dom、fastclick已经默认加载，这里只需加载你项目上需要的文件
*/
</script>

</body>
</html>

```


* PC端发布环境html、JSP（放于ecology）：

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>本地调试</title>
  <link rel="stylesheet" type="text/css" href="/cloudstore/resource/pc/antd/antd.min.css" />
  <!-- Polyfills -->
    <!--[if lt IE 10]>
    <script src="/cloudstore/resource/pc/shim/shim.min.js"></script>
    <script src="/cloudstore/resource/pc/jquery/jquery-1.8.3.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="index.css"/> <!-- webpack打包编译后的css文件 -->
</head>
<body>
  <div id="container"></div>
  <script src="/cloudstore/resource/pc/react/react-with-addons.min.js"></script>
  <script src="/cloudstore/resource/pc/react/react-dom.min.js"></script>
  <script src="/cloudstore/resource/pc/antd/antd.min.js"></script>
  <script src="/cloudstore/resource/pc/promise/promise.min.js"></script>
  <script src="/cloudstore/resource/pc/fetch/fetch.min.js"></script>
  <script src="/cloudstore/resource/pc/com/index.js"></script>
  <script src="index.js"></script> <!-- webpack打包编译后的JS文件 -->
</body>
</html>
```



##### （3）【非必要，可选方式】本地无需启动后台服务、热编译、热更新（mode='debug'），此模式下必须跨域访问才能获取服务器数据
* 启动命令：npm start
* 移动端debug html编写：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MobileDemo</title>
  <script>
    (function (baseFontSize, fontscale) {
      var _baseFontSize = baseFontSize || 100;
      var _fontscale = fontscale || 1;
      var win = window;
      var doc = win.document;
      var ua = navigator.userAgent;
      var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
      var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
      var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
      var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
      var dpr = win.devicePixelRatio || 1;
      if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
      }
      var scale = 1 / dpr;
      var metaEl = doc.querySelector('meta[name="viewport"]');
      if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        doc.head.appendChild(metaEl);
      }
      metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
      doc.documentElement.style.fontSize = _baseFontSize / 2 * dpr * _fontscale + 'px';
      window.viewportScale = dpr;
    })();
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
  <link rel="stylesheet" href="index.css"/>
</head>
<body>

<div id="container"></div>
<script type="text/javascript" src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
  FastClick.attach(document.body);
</script>
<script src="http://daiyingfeng.com/views/m/js/react-with-addons.min.js"></script>
<script src="http://daiyingfeng.com/views/m/js/react-dom.min.js"></script>
<script src="common.js"></script>
<script src="index.js"></script>

</body>
</html>

```

移动debug html相关资源 | 说明
---|---
fastclick | 提升点击体验
react-with-addons、react-dom | react相关库
common.js、index.js、index.css | 源码打包后的文件

* PC端debug html编写：

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>本地调试</title>
  <link rel="stylesheet" type="text/css" href="http://ec.e-cology.cn/cloudstore/resource/pc/antd/antd.min.css" />
  <!-- Polyfills -->
    <!--[if lt IE 10]>
    <script src="http://ec.e-cology.cn/cloudstore/resource/pc/shim/shim.min.js"></script>
    <script src="http://ec.e-cology.cn/cloudstore/resource/pc/jquery/jquery-1.8.3.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="index.css"/>
</head>
<body>
  <div id="container"></div>
  <script src="http://ec.e-cology.cn/cloudstore/resource/pc/react/react-with-addons.min.js"></script>
  <script src="http://ec.e-cology.cn/cloudstore/resource/pc/react/react-dom.min.js"></script>
  <script src="http://ec.e-cology.cn/cloudstore/resource/pc/antd/antd.min.js"></script>
  <script src="http://ec.e-cology.cn/cloudstore/resource/pc/promise/promise.min.js"></script>
  <script src="http://ec.e-cology.cn/cloudstore/resource/pc/fetch/fetch.min.js"></script>
  <script src="http://ec.e-cology.cn/cloudstore/resource/pc/com/index.js"></script>
  <script type="text/javascript">
      //window.server = "http://192.168.40.3:8080"; //跨域服务器
      window.server = "http://ec.e-cology.cn";
  </script>
  <script src="common.js"></script>
  <script src="index.js"></script>
</body>
</html>
```

PC端debug html相关资源 | 说明
---|---
antd.min.css、antd.min.js | 蚂蚁金服前端组件库，使用的版本必须在[antd1.x](http://1x.ant.design/changelog)
shim.min.js | antd兼容IE8、IE9
jQuery.js | antd兼容IE8
promise.js、fetch.js | 兼容IE8的fetch和promise
com/index.js | 泛微根据业务封装的组件库
common.js、index.js、index.css | 源码打包后的文件
window.server | 跨域服务器，在代码里可以引用这个地址来用于快速切换跨域路径
---

#### 3、相关技术栈

技术 | 作用
---|---
[react](https://facebook.github.io/react/) | 基于vdom、组件化的前端View库
[react-router](https://github.com/ReactTraining/react-router) | 基于react的前端路由库，当页面较多时使用
[redux](https://github.com/reactjs/redux) | 前端数据管理库，当模块较多时使用
[babel](http://babeljs.io/) | 支持jsx、es6等语法解析
[webpack](http://webpack.github.io/) | 前端工程化打包、部署工具
[promise](https://github.com/then/promise) | 异步编程库，让多异步请求业务更稳定易维护
[fetch](https://github.com/github/fetch) | 默认集成promise的ajax库
[antd](http://1x.ant.design/changelog) | antd组件库的PC版1.x，最低兼容到IE8
[antd-mobile](https://mobile.ant.design/) | antd组件库MOBILE版
