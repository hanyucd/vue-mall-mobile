/**
  * 以下这段代码是用于根据移动端设备的屏幕分辨率计算出合适的根元素的大小
  * 当设备宽度为 375(iPhone6) 时，根元素 font-size = 16px; 依次增大；
  * 限制当为设备宽度大于 768(iPad) 之后，font-size不再继续增大
  * scale 为 meta viewport 中的缩放大小
  */

 module.exports = function (doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  /**
    * ================================================
    *  设置根元素 font-size
    * 当设备宽度为 375 (iPhone6) 时，根元素 font-size = 16px; 
    * ================================================
    */
  var refreshRem = function () {
    var clientWidth = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;

    if (!clientWidth) return;
    var fontSize;
    var width = clientWidth;
    fontSize = 16 * width / 375;
    docEl.style.fontSize = fontSize + 'px';
    docEl.style.maxWidth = 768 + 'px';
    docEl.style.margin = '0 auto';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
};