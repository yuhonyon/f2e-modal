const Modal =require("./modal.js");


exports.alert = function (mes, title, cb){
  let promise;
  let PromiseIns;

  if ($.isFunction(title)) {
    cb=title;
    title=null;
  }
  if(!cb){
    PromiseIns=new Promise((resolve, reject) => {
      promise={resolve:resolve,reject:reject}
    });
    cb=promise.resolve;
  }

  let options={
    backdrop: 'static',
    content: mes,
    btn: {'确定': cb},
    title: null,
    icon: title?null:"logo",
    mold: 'alert',
    show: true
  }

  if(PromiseIns){
    new Modal(options)
    return PromiseIns;
  }else{
    return new Modal(options)
  }
}

exports.confirm = function (mes, title = null, sucCb, errCb) {
  let promise;
  let PromiseIns;
  if ($.isFunction(title)) {
    errCb = sucCb;
    sucCb = title;
    title = null;
  }
  if(!errCb&&!sucCb){
    PromiseIns=new Promise((resolve, reject) => {
      promise={resolve:resolve,reject:reject}
    });
    sucCb=promise.resolve;
    errCb=promise.reject;
  }
  let options =  {
    backdrop: 'static',
    content: mes,
    btn: {
      "确定": sucCb,
      "取消": errCb
    },
    title: title,
    icon: title?null:"logo",
    mold:'confirm',
    show:true
  };


  if(PromiseIns){
    new Modal(options)
    return PromiseIns;
  }else{
    return new Modal(options)
  }
}

exports.prompt = function (mes,value, title = null, sucCb, errCb) {
  let promise;
  let PromiseIns;
  if ($.isFunction(title)) {
    errCb = sucCb;
    sucCb = title;
    title = null;
  }
  if ($.isFunction(value)) {
    errCb = sucCb;
    sucCb = value;
    value = null;
  }
  if(!errCb&&!sucCb){
    PromiseIns=new Promise((resolve, reject) => {
      promise={resolve:resolve,reject:reject}
    });
    sucCb=promise.resolve;
    errCb=promise.reject;
  }
  let options =  {
    backdrop: 'static',
    content: mes,
    btn: {
      "确定": sucCb,
      "取消": errCb
    },
    title: title,
    icon: title?null:"logo",
    mold:'prompt',
    show:true,
    value:value
  };

  if(PromiseIns){
    new Modal(options)
    return PromiseIns;
  }else{
    return new Modal(options)
  }
}

let toastInstance;
exports.toast = function (mes, time=1000){
  if(!toastInstance){
    let options={
      backdrop: false,
      content: mes,
      btn: null,
      time: time,
      title: null,
      icon: null,
      show:true,
      mold: 'toast',
    }
    toastInstance = new Modal(options)
    console.log(toastInstance)
    return toastInstance;
  }
  if(!toastInstance.$modalContainer.is(':hidden')){
    toastInstance.hide(true)
  }
  toastInstance._changeOptions({time:time})._changeContent(mes).show();
}
