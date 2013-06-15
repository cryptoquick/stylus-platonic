var Camera;

Camera = (function() {
  /*
  @private
  */

  Camera.prototype._$objects = Array;

  Camera.prototype._mouse = {
    x: 0,
    y: 0,
    lx: 0,
    ly: 0
  };

  Camera.prototype._dragging = false;

  /*
  @public
  */


  Camera.prototype.el = null;

  Camera.prototype.width = 0;

  Camera.prototype.height = 0;

  Camera.prototype.perspective = null;

  Camera.prototype.base_rotation_x = -30;

  Camera.prototype.base_rotation_y = 0;

  Camera.prototype.rotate_x = 0;

  Camera.prototype.rotate_y = 0;

  Camera.prototype.manual_rotate = true;

  Camera.prototype.gimball_radius = 400;

  Camera.prototype.max_rotation_x = 360;

  Camera.prototype.max_rotation_y = 360;

  /*
  constructor
  @param {$element} el
  @api    private
  */


  function Camera(el) {
    var _this = this;
    this.el = el;
    this.rotate_x = this.base_rotation_x;
    this.rotate_y = this.base_rotation_y;
    this.perspective = parseFloat(this.el.css('perspective'));
    this._$objects = $('[data-camera-transform]');
    this.el.mousemove(function(event) {
      return _this._on_mouse_move(event);
    });
    this.el.mouseup(function(event) {
      return _this._on_mouse_up(event);
    });
    this.el.mousedown(function(event) {
      return _this._on_mouse_down(event);
    });
  }

  /*
  Update the camera
  @api public
  */


  Camera.prototype.update = function() {
    var dist_x, dist_y, object, pct_x, pct_y, transform, _i, _len, _ref, _results;
    this.el.css('perspective', this.perspective + 'px');
    if (this.manual_rotate) {
      if (this._dragging) {
        dist_x = this._mouse.x - this._mouse.lx;
        dist_y = this._mouse.ly - this._mouse.y;
        pct_x = dist_x / (this.gimball_radius * 0.25);
        pct_y = dist_y / (this.gimball_radius * 0.25);
        this.rotate_x = this.rotate_x + ((this.max_rotation_x * 0.01) * pct_y);
        this.rotate_y = this.rotate_y + ((this.max_rotation_y * 0.01) * pct_x);
        if (this.rotate_y > 360) {
          this.rotate_y -= 360;
        } else if (this.rotate_y < -360) {
          this.rotate_y += 360;
        }
        if (this.rotate_x > 360) {
          this.rotate_x -= 360;
        } else if (this.rotate_x < -360) {
          this.rotate_x += 360;
        }
      }
    } else {
      pct_x = (this._mouse.x - this.width / 2) / this.width;
      pct_y = (this.height / 2 - this._mouse.y) / this.height;
      this.rotate_x = this.base_rotation_x + (this.max_rotation_x * pct_y);
      this.rotate_y = this.base_rotation_y + (this.max_rotation_y * pct_x);
    }
    _ref = this._$objects;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      object = _ref[_i];
      transform = "rotateX(" + this.rotate_x + "deg) rotateY(" + this.rotate_y + "deg)";
      _results.push($(object).css({
        '-webkit-transform': transform,
        'transform': transform
      }));
    }
    return _results;
  };

  /*
  Resize the viewport
  @api public
  */


  Camera.prototype.resize = function() {
    this.width = this.el.width();
    return this.height = this.el.height();
  };

  /*
  Viewport mouse move handler
  @param {Object} event
  @api    private
  */


  Camera.prototype._on_mouse_move = function(event) {
    this._mouse.x = event.pageX;
    return this._mouse.y = event.pageY;
  };

  /*
  Viewport mouse down handler
  @param {Object} event
  @api    private
  */


  Camera.prototype._on_mouse_down = function(event) {
    this._dragging = true;
    this._mouse.lx = event.pageX;
    this._mouse.ly = event.pageY;
    this.el.css('cursor', '-webkit-grabbing');
    return event.preventDefault();
  };

  /*
  Viewport mouse up handler
  @param {Object} event
  @api    private
  */


  Camera.prototype._on_mouse_up = function(event) {
    this._dragging = false;
    return this.el.css('cursor', 'inherit');
  };

  return Camera;

})();
