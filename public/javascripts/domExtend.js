Element.prototype.hasClass = function(className) {
  if (this.classList) {
    return this.classList.contains(className);

  } else {
    return !!this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
};

Element.prototype.addClass = function(className) {
  if (this.classList) {
    this.classList.add(className);

  } else if (!this.hasClass(this, className)) {
		this.className += " " + className;
  }
};

Element.prototype.removeClass = function(className) {
	if (this.classList) {
	  this.classList.remove(className);

	} else if (this.hasClass(this, className)) {
	  var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	  this.className = this.className.replace(reg, ' ');
	}
};

Element.prototype.hide = function() {
	this.addClass('hidden');
};

Element.prototype.show = function() {
	this.removeClass('hidden');
};
	