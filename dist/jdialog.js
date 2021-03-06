/*!
 * jdialog v2.0 
 * https://github.com/BndyNet/jDialog#readme 
 * 
 * Copyright (c) 2016 Bndy.Net (http://www.bndy.net), released under the MIT license
 * 
 * Requires: jQuery, layer, alertifyjs[optional] */

"use strict";
(function(window) {
  var jDialog;
  if (typeof jQuery === 'undefined') {
    throw new Error('jDialog component requires jQuery');
  }
  if (typeof layer === 'undefined') {
    throw new Error('jDialog component requires layer');
  }
  jDialog = function() {
    this.VERSION = "2.0";
    this.options = {
      title: "jDialog v2",
      shade: [0.2, "#000"],
      shadeClose: false,
      shift: 0,
      maxmin: true,
      fix: true,
      btn: ["OK", "Cancel"],
      closeBtn: 1,
      tips: [1, '#f0ad4e'],
      tipsTime: 3000,
      loadingIcon: 1,
      loadingShade: [0.6, "#fff"],
      useAlertify: true,
      wait: 2,
      logPosition: "bottom right",
      closeLogOnClick: false
    };
    return this.init();
  };
  jDialog.prototype = {
    init: function() {
      if (!$) {
        console.error("jQuery Required");
      }
      if (this.options.useAlertify && typeof alertify === "undefined") {
        console.error("alertify Required");
      }
      if (typeof alertify !== "undefined") {
        alertify.logPosition(this.options.logPosition);
        alertify.closeLogOnClick(this.options.closeLogOnClick);
      }
    },
    _wrapSize: function(size) {
      if (size && $.isArray(size)) {
        if ($.isNumeric(size[0])) {
          size[0] = size[0] + 'px';
        }
        if ($.isNumeric(size[1])) {
          size[1] = size[1] + 'px';
        }
      } else {
        size = ['50%', '50%'];
      }
      return size;
    },
    _getDialogResult: function() {
      if (parent) {
        return parent.dialog_result;
      } else {
        return window.dialog_result;
      }
    },
    _setDialogResult: function(result) {
      if (parent) {
        return parent.dialog_result = result;
      } else {
        return window.dialog_result = result;
      }
    },
    set: function(options) {
      this.options = $.extend({}, this.options, options);
      return this.init();
    },
    alert: function(msg, callback, options) {
      var root;
      root = this;
      options = $.extend({}, root.options, {
        btn: root.options.btn[0]
      }, options);
      return layer.alert(msg, options, callback);
    },
    success: function(msg, callback, options) {
      var root;
      root = this;
      options = $.extend({}, root.options, {
        icon: 1,
        btn: root.options.btn[0]
      }, options);
      if (!root.options.useAlertify) {
        return layer.alert(msg, options.wait, callback);
      } else {
        return alertify.success(msg);
      }
    },
    info: function(msg, callback, options) {
      var root;
      root = this;
      options = $.extend({}, root.options, {
        icon: 0,
        btn: root.options.btn[0]
      }, options);
      if (!root.options.useAlertify) {
        return layer.alert(msg, options, callback);
      } else {
        console.debug(options);
        return alertify.log(msg, options.wait, callback);
      }
    },
    error: function(msg, callback, options) {
      var root;
      root = this;
      options = $.extend({}, root.options, {
        icon: 2,
        btn: root.options.btn[0]
      }, options);
      if (!root.options.useAlertify) {
        return layer.alert(msg, options, callback);
      } else {
        return alertify.error(msg, options.wait, callback);
      }
    },
    confirm: function(msg, fnYes, fnCancel, options) {
      var root;
      root = this;
      options = $.extend({}, root.options, {
        icon: 3
      }, options);
      return layer.confirm(msg, options, function(index) {
        if (fnYes) {
          fnYes(index);
        }
        return layer.close(index);
      }, function(index) {
        if (fnCancel) {
          return fnCancel(index);
        }
      });
    },
    prompt: function(title, fnYes, formType) {
      var options, root;
      root = this;
      options = $.extend({}, root.options, {
        title: title,
        formType: formType || 1
      });
      return layer.prompt(options, fnYes);
    },
    tip: function(msg, selector, options) {
      return layer.tips(msg, selector, $.extend({}, this.options, {
        shade: false,
        btn: null,
        closeBtn: 0,
        time: this.options.tipsTime
      }, options));
    },
    show: function(selector, title, size) {
      var options, root;
      root = this;
      if (!size || !$.isArray(size)) {
        size = ['50%', '50%'];
      }
      options = $.extend({}, root.options, {
        type: 1,
        btn: null,
        area: root._wrapSize(size),
        content: $(selector)
      });
      return layer.open(options);
    },
    iframe: function(url, title, size, fnClose) {
      var options, root;
      root = this;
      if (!size || !$.isArray(size)) {
        size = ['50%', '50%'];
      }
      options = $.extend({}, root.options, {
        title: title,
        type: 2,
        btn: null,
        area: root._wrapSize(size),
        content: url,
        end: function() {
          if (fnClose && root._getDialogResult()) {
            fnClose(root._getDialogResult());
          }
          return root._setDialogResult(null);
        }
      });
      return layer.open(options);
    },
    loading: function(selector, options) {
      var html, root;
      root = this;
      if (selector) {
        options = $.extend({}, {
          text: 'Loading...'
        }, options);
        html = $('<div class="bn-jdialog-loading"><i class="icon fa fa-spin fa-spinner"></i> <span class="text">' + options.text + '</span></div>');
        $(selector).each(function() {
          var h;
          $(this).find('.bn-jdialog-loaded').remove();
          if ($(this).find('.bn-jdialog-loading').length > 0) {
            return $(this).find('.bn-jdialog-loading').show();
          } else {
            h = html.clone();
            $(this).height($(this).height()).css('position', 'relative');
            h.width($(this).outerWidth());
            h.height($(this).outerHeight());
            h.css('padding-top', h.height() / 2 - 10);
            return $(this).append(h);
          }
        });
      } else {
        options = $.extend({}, root.options, {
          btn: null,
          shade: root.options.loadingShade
        });
        layer.load(root.options.loadingIcon, options);
      }
    },
    loaded: function(selector, selectorContent) {
      if (selector) {
        $(selector).each(function() {
          if (selectorContent) {
            $(this).children(':not(.bn-jdialog-loading)').remove();
            return $(this).find('.bn-jdialog-loading').removeClass('bn-jdialog-loading').addClass('bn-jdialog-loaded').html(selectorContent);
          } else {
            return $(this).find('.bn-jdialog-loading').remove();
          }
        });
      } else {
        layer.closeAll("loading");
      }
    },
    close: function(dialogResult) {
      var index;
      if (typeof dialogResult !== 'undefined') {
        this._setDialogResult(dialogResult);
      }
      index = layer.getFrameIndex(window.name);
      layer.close(index);
      if (parent.layer) {
        index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
      }
    },
    closeAll: function(dialogResult) {
      if (typeof dialogResult !== 'undefined') {
        this._setDialogResult(dialogResult);
      }
      layer.closeAll();
      if (parent.layer) {
        parent.layer.closeAll();
      }
    }
  };
  return window.dialog = new jDialog();
})(window);
