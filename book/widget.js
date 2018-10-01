require(['gitbook'], function(gitbook) {
  var conf = {};

  function appendElement(elem) {
    var old, container, iframe, style, form;
    if (elem.container.attr.id) {
      old = document.getElementById(elem.container.attr.id);
      if (old !== null) old.parentNode.removeChild(old);
    } else {
      alert('Container ID is not defined.');
    }
    if (elem.container) {
      container = createContainer(elem.container);
    } else {
      alert('Container is not defined.');
    }
    if (elem.container.parent) {
      if (elem.container.parent === 'body') {
        document.body.appendChild(container);
      } else {
        document.getElementById(elem.container.parent).appendChild(container);
      }
    } else {
      alert('Parent is not defined.');
    }
    if (elem.style) {
      style = createContainer(elem.style);
      container.appendChild(style);
    } else {
      alert('Style is not defined.');
    }
    if (elem.iframe) {
      iframe = createContainer(elem.iframe);
      container.appendChild(iframe);
    } else {
      alert('iframe is not defined.');
    }
    if (elem.form) {
      form = createContainer(elem.form);
      container.appendChild(form);
      form.submit();
    } else {
      alert('Form is not defined.');
    }
  }

  function createContainer(c) {
    var container = createElement(c.elem, c.attr, c.text);
    if (c.child) {
      var child = c.child;
      for (var i in child) {
        createChild(child[i], container);
      }
    }
    return container;
  }

  function createElement(elem, attr, text) {
    var element = document.createElement(elem);
    if (attr) {
      for (var a in attr) {
        if (a === 'value' && isObject(attr[a])) {
          element.setAttribute(a, assignValue(attr[a]));
        } else {
          element.setAttribute(a, attr[a]);
        }
      }
    }
    if (text) {
      if (element.innerText !== undefined) {
        element.innerText = text;
      } else if (element.textContent !== undefined) {
        element.textContent = text;
      }
    }
    return element;
  }

  function createChild(c, container) {
    if (c.child) {
      container.appendChild(createContainer(c));
    } else {
      container.appendChild(createElement(c.elem, c.attr, c.text));
    }
    return container;
  }

  function assignValue(v) {
    switch (v.type) {
      case 'localStorage':
        return localStorage.getItem(v.path);
        break;
      case 'state':
        return JSON.stringify(createPath('gitbook', v.path));
        break;
      case 'location':
        return JSON.stringify(createPath('location', v.path));
        break;
      default:
        return v;
    }
  }

  function createPath(parent, path) {
    if (path) {
      for (var key of path.split('.')) {
        parent += "['" + key + "']";
      }
    }
    return eval(parent);
  }

  function isObject(obj) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
  }

  gitbook.events.bind('page.change', function() {
    conf = gitbook.state.config.pluginsConfig.widget;

    var common = conf.common;
    var specific = conf.specific;

    if (common) {
      for (var i in common) {
        appendElement(common[i]);
      }
    }

    if (specific) {
      for (var i in specific) {
        if (specific[i].path === location.pathname + location.search) {
          appendElement(specific[i]);
        }
      }
    }
  });

});
