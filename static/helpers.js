const helpers = {
    empty: function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },
    generateRandomNumber: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    addClass: function (element, className) {
      element.classList.add(className);
    },
    isNotEmpty: function (object) {
        return object != null && object.length > 0;
    },
    isNullOrUndefined: function (object) {
        return object == null;
    }
};