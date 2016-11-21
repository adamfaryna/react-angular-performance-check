(function () {
	var api = {
		removeAllChilds: function(element) {
			while(element.children.length !== 0) {
				element.removeChild(element.children[0]);
			}
		},
		hasClass: function(element, className) {
		  if (element.classList) {
		    return element.classList.contains(className);

		  } else {
		    return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
		  }
		},
		addClass: function(element, className) {
		  if (element.classList) {
		    element.classList.add(className);

		  } else if (!this.hasClass(element, className)) {
				element.className += ' ' + className;
		  }
		},
		removeClass: function(element, className) {
			if (element.classList) {
			  element.classList.remove(className);

			} else if (this.hasClass(element, className)) {
			  var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			  element.className = element.className.replace(reg, ' ');
			}
		},
		hide: function(element) {
			this.addClass(element, 'hidden');
		},
		show: function(element) {
			this.removeClass(element, 'hidden');
		}
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = api;
		
	} else if (window.app) {
		window.app.common.dom = api;
		
	} else {
		throw new Error('No application context nor modules found!');
	}
})();
