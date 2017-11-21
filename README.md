# 弹框模态框 [![Build Status](https://travis-ci.org/yuhonyon/f2e-modal.svg?branch=master)](https://travis-ci.org/yuhonyon/f2e-modal) [![npm](https://img.shields.io/npm/v/@fastweb/modal.svg)](https://www.npmjs.com/package/@fastweb/modal)
----
>模态框,支持jq插件用法,全局用法,支持promise

## 安装

esm:
```bash
cnpm i @fastweb/modal -S
```
common:
```bash
cnpm i @fastweb/modal_common -S
```

##用法

```js
import {Modal,ModalInstance,ModalJQuery} from '@fastweb/modal';
//普通用法
new Modal(options);
//全局方法
ModalInstance.alert('***');
ModalInstance.confirm('***');
ModalInstance.toast('***');
ModalInstance.prompt('***');
//使用jq
ModalJQuery($);
$.alert('***');
$.confirm('***');
$.toast('***');
$.prompt('***');
$("domId").modal(options|"show"|"hide")
```

## options
* backdrop: 默认true(true有遮罩且可以点击,false无遮罩,static有遮罩不可点击)
* show: 默认false(默认显示)
* time: 默认0(自动关闭的时间,为0不自动关闭)
* type: 默认'defalut' (success,warning,info,danger)
* width: null (宽)
* height: null (高)
* container: 默认document.body (弹框容器)
* location: 默认'center' (弹框位置center,bottom,top)
* content: null (弹框内容)
* title: null (弹框标题)
* icon: 'logo' (图标ok,error,warning,img.src)
* btn: null (按钮 eg: {"确定":function(){...},"取消":function(){...}})
* mold: ''//alert,confirm,toast
* value:''(prompt的value)
* animation: ['fadeIn', 'fadeOut'] (location为center,bottom,top下默认值分别为['fadeIn', 'fadeOut'],['slideInUp', 'slideOutDown'],['slideInDown', 'slideOutUp'])


## 方法
* show 显示
* hide  隐藏
# destroy  摧毁


## 事件
* onInit 初始化
* onShow 显示
* onClickBtn  点击按钮
* onHide  隐藏
# onDestroy  摧毁


## jq参数
* options 同上options
* show  显示
* hide 隐藏

## 全局参数
* alert(msg, title, cb)
* confirm(msg, title, sucCb, errCb)
* prompt(msg,value, title, sucCb, errCb)
* toast(msg, time默认1000)

**注:**
+ msg,value必填,其他可选eg:`confirm(msg, cb)`
+ sucCb, errCb回调可以使用promise代替eg:
```js
  confirm("你确定吗").then(()=>{
    console.log("确定")
  }).catch(()=>{
    console.log("取消")
  })
```
