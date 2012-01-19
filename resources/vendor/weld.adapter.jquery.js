jQuery.fn.weld = function (data, config) {
  return this.each (function () {
    weld(this, data, config);
  });
};