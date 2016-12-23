﻿// Generated by IcedCoffeeScript 108.0.11

/*!
 * jjDialog v2.0.0
 * http://www.bndy.net
#
 * Copyright (c) 2016 Bndy.Net, released under the MIT license
#
 * Requires: jQuery, layer
 */

(function() {
  (function(window) {
    var jDialog;
    if (typeof jQuery === 'undefined') {
      throw new Error('jDialog component requires jQuery');
    }
    if (typeof layer === 'undefined') {
      throw new Error('jDialog component requires layer');
    }
    jDialog = function() {
      this.VERSION = "1.0.0";
      this.options = {
        title: "jDialog",
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
      set: function(options) {
        this.options = $.extend({}, this.options, options);
        return this.init();
      },
      alert: function(msg, callback) {
        var options, root;
        root = this;
        options = $.extend({}, root.options, {
          btn: root.options.btn[0]
        });
        return layer.alert(msg, options, callback);
      },
      success: function(msg, callback) {
        var options, root;
        root = this;
        if (!root.options.useAlertify) {
          options = $.extend({}, root.options, {
            icon: 1,
            btn: root.options.btn[0]
          });
          return layer.alert(msg, options, callback);
        } else {
          return alertify.success(msg);
        }
      },
      info: function(msg, callback) {
        var options, root;
        root = this;
        if (!root.options.useAlertify) {
          options = $.extend({}, root.options, {
            icon: 0,
            btn: root.options.btn[0]
          });
          return layer.alert(msg, options, callback);
        } else {
          return alertify.log(msg);
        }
      },
      error: function(msg, callback) {
        var options, root;
        root = this;
        if (!root.options.useAlertify) {
          options = $.extend({}, root.options, {
            icon: 2,
            btn: root.options.btn[0]
          });
          return layer.alert(msg, options, callback);
        } else {
          return alertify.error(msg);
        }
      },
      confirm: function(msg, fnYes, fnCancel) {
        var options, root;
        root = this;
        options = $.extend({}, root.options, {
          icon: 3
        });
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
        }));
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
      iframe: function(url, title, size) {
        var options, root;
        root = this;
        if (!size || !$.isArray(size)) {
          size = ['50%', '50%'];
        }
        options = $.extend({}, root.options, {
          type: 2,
          btn: null,
          area: root._wrapSize(size),
          content: url
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
          html = $('<div class="bn-jDialog-loading"><i class="icon fa fa-spin fa-spinner"></i><span class="text">' + options.text + '</span></div>');
          $(selector).each(function() {
            var h;
            $(this).find('.bn-jDialog-loaded').remove();
            if ($(this).find('.bn-jDialog-loading').length > 0) {
              return $(this).find('.bn-jDialog-loading').show();
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
              $(this).children(':not(.bn-jDialog-loading)').remove();
              return $(this).find('.bn-jDialog-loading').removeClass('bn-jDialog-loading').addClass('bn-jDialog-loaded').html(selectorContent);
            } else {
              return $(this).find('.bn-jDialog-loading').remove();
            }
          });
        } else {
          layer.closeAll("loading");
        }
      }
    };
    return window.dialog = new jDialog();
  })(window);

}).call(this);
