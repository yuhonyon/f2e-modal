import EventTarget from "@fastweb/event";

export default class Modal extends EventTarget{
  constructor(options) {
    super();

    this.defaults = {
      backdrop: true, //true,false,static
      show: false,
      time: 0,
      type: 'defalut', //success,warning,info,danger
      width: null,
      height: null,
      container: document.body,
      location: 'center', //center,bottom,top
      content: null,
      title: null,
      icon: 'logo', //ok,error,warning,img.src
      btn: null,
      mold: '',//alert,confirm,toast
      animation: [
        'fadeIn', 'fadeOut'
      ], //['slideInUp', 'slideOutDown'],['slideInDown', 'slideOutUp']
      animationSpeed: 500,
      backdropClass: 'modal-backdrop',
      containerClass: 'modal-container',
      headerClass: 'modal-header',
      footerClass: 'modal-footer',
      iconClass: 'modal-icon',
      contentClass: 'modal-content',
      toastClass: 'modal-toast',
      onInit: null,
      onShow: null,
      onClickBtn: null,
      onHide: null
    };

    this.DEFAULT_ICON = {
      ok: "",
      error: "",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3QzgxNjk4NzQxRUQxMUU3ODAzRkZBRjU3RTAwQUE3NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3QzgxNjk4ODQxRUQxMUU3ODAzRkZBRjU3RTAwQUE3NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdDODE2OTg1NDFFRDExRTc4MDNGRkFGNTdFMDBBQTc2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdDODE2OTg2NDFFRDExRTc4MDNGRkFGNTdFMDBBQTc2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GTORKwAAB0pJREFUeNrUWmls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",
      warning: ""
    };

    this._timer = {};
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.alert = this.alert.bind(this);
    this.destroy = this.destroy.bind(this);


    this.init(options);

  }

  init(options) {

    this.destroy();
    if (options && !options.animation && options.location) {
      if (options.location == "top") {
        this.defaults.animation = ['slideInUp', 'slideOutUp'];
      } else if (options.location == "bottom") {
        this.defaults.animation = ['slideInDown', 'slideOutDown'];
      }
    }
    this.options = $.extend(false, {}, this.defaults, options);
    if (options) {
      this._creatModal();
      this._location();
      if (this.options.show) {
        this.show();
      }
    }
    this.emit("onInit", this);
  }

  alert(mes, title, cb = this.destroy) {

    this.options = $.extend(true,{}, this.defaults, {
      backdrop: 'static',
      content: mes,
      btn: null,
      title: null,
      icon: 'logo',
      mold: 'alert',
      show: true
    });

    if ($.isFunction(title)) {
      this.options.btn = {
        '确定': title
      };
    } else if (typeof title === 'string') {
      this.options.title = title;
    } else {
      this.options.btn = {
        '确定': cb
      };
    }

    // let alertModal=new Modal(this.options);
    // if(this.options.mold!=='alert'){
    //   this.destroy();
    //   this._creatModal();
    //   this._location();
    //
    // }
    //
    // this.show();
  }

  confirm(mes, title = null, sucCb = this.hide, errCb = this.hide) {
    this.destroy();
    if ($.isFunction(title)) {
      errCb = sucCb;
      sucCb = title;
      title = null;
    }
    this.options = $.extend(true, this.defaults, {
      backdrop: 'static',
      content: mes,
      btn: {
        "确定": sucCb,
        "取消": errCb
      },
      title: title,
      icon: 'logo'
    });

    this._creatModal();
    this._location();
    this.show();
  }

  toast(mes, time = 1000) {
    this.destroy();
    this.options = $.extend(true, this.defaults, {
      backdrop: false,
      content: mes,
      btn: null,
      time: time,
      title: null,
      icon: null
    });
    this._creatModal();

    this.$modalContainer.addClass(this.options.toastClass);
    this._location();
    this.show();

  }

  _creatModal() {
    this.$backdrop = $("<div class='" + this.options.backdropClass + "'></div>");
    this.$modalContainer = $("<div class='" + this.options.containerClass + "'></div>");
    if (this.options.width) {
      this.$modalContainer.css("width", this.options.width);
    }
    if (this.options.height) {
      this.$modalContainer.css("height", this.options.height);
    }
    this.$modalContent = $("<div class='" + this.options.contentClass + "'></div>");

    if (this.options.title) {
      this.$modalHeader = $("<div class='" + this.options.headerClass + "'>" + this.options.title + "</div>");
      this.$modalContainer.append(this.$modalHeader);
    }

    if (this.options.icon) {
      let icon = this.DEFAULT_ICON[this.options.icon]
        ? this.DEFAULT_ICON[this.options.icon]
        : this.options.icon;
      this.$modalIcon = $("<div class='" + this.options.iconClass + "'><img src='" + icon + "' /></div>");
    }
    this.$modalContent.append(this.$modalIcon);

    this.$modalContent.append(this.options.content);
    this.$modalContainer.append(this.$modalContent);
    if (this.options.btn) {
      this.$modalFooter = $("<div class='" + this.options.footerClass + "'></div>");
      this.$modalContainer.append(this.$modalFooter);
      this.$modalFooter.on("click", "button", (event) => {
        this.emit("onClickBtn", this, event);
      });
      for (let i in this.options.btn) {
        let $btn = $('<button>' + i + '</button>');
        if (this.options.btn[i]) {
          $btn.on('click', (event) => {
            this.options.btn[i].bind(this)(event);
          });
        }

        this.$modalFooter.append($btn);
        $btn = null;
      }
    }

    $(this.options.container).append(this.$backdrop).append(this.$modalContainer);
    this.$backdrop.on('touchmove', () => {
      return false;
    });
    if (this.options.backdrop === true) {
      this.$backdrop.on('click', () => {
        this.hide();
      });
    } else if (!this.options.backdrop) {
      this.$backdrop.remove();
    }

    this.$modalContainer.on('click', '.modal-close', () => {
      this.hide();
    });
  }

  _location() {
    if (this.options.location == "top") {
      this.$modalContainer.addClass("top");
    } else if (this.options.location == "bottom") {
      this.$modalContainer.addClass("bottom");
    } else {
      this.$modalContainer.addClass("center");
    }
  }
  _autoHideModal() {
    if (this.options.time != 0) {
      this._clearTimer();
      this._timer.autoHideTimer = setTimeout(() => {
        this.hide();
      }, this.options.time);
    }
  }
  _clearTimer(name) {
    if (typeof name === "undefined") {
      for (let i in this._timer) {
        clearTimeout(this._timer[i]);
      }
    } else {
      clearTimeout(this._timer[name]);
    }
  }
  show() {
    if(!this.$modalContainer){
      this._creatModal();
    }
    if(!this.$modalContainer.is(":hidden")){
      return;
    }
    this.$modalContainer.addClass(this.options.animation[0]).removeClass(this.options.animation[1]);
    if (this.options.backdrop) {
      this.$backdrop.fadeOut(300);
    }
    this.$backdrop.fadeIn();
    this.$modalContainer.show();
    this._autoHideModal();
    this.emit("onShow", this);
    return this;
  }
  hide() {
    if(!this.$modalContainer||this.$modalContainer.is(":hidden")){
      return;
    }
    this.$modalContainer.addClass(this.options.animation[1]).removeClass(this.options.animation[0]);
    this._clearTimer();
    this._timer.hideTimer = setTimeout(() => {
      this.$modalContainer.hide();
    }, this.options.animationSpeed);
    this.$backdrop.fadeOut(300);
    this.emit("onHide", this);
    return this;
  }
  destroy() {
    if (this.$modalContainer) {
      this.$modalContainer.remove();
    }
    if (this.$backdrop) {
      this.$backdrop.remove();
    }
    this._clearTimer();
    this.$backdrop = null;
    this.$modalContainer = null;
    this.$modalContent = null;
    this.$modalHeader = null;
    this.$modalFooter = null;
    this.$modalIcon = null;
    this.emit("onDestroy", this);
  }
}
