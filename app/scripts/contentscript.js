'use strict';

var container = document.querySelector('.header > .container');
var defaultConfigJson = JSON.stringify([
  'gh:logo',
  'gh:search', {
    'gh:nav': [
      'gh:pull-request',
      'gh:issues',
      'gh:gist'
    ]
  }, {
    'gh:user-nav': [
      'gh:notifications',
      'gh:new',
      'gh:user'
    ]
  }
], null, 2);
var defaultElements = {
  'gh:nav': {
    html: container.querySelector('ul.header-nav.left'),
    create: function(children) {
      var element = this.html;
      element.innerHTML = '';
      appendTo(element, children);
      return element.cloneNode(true);
    }
  },

  'gh:user-nav': {
    html: container.querySelector('ul.header-nav.user-nav.right'),
    create: function(children) {
      var element = this.html;
      element.innerHTML = '';
      appendTo(element, children);
      return element.cloneNode(true);
    }
  },

  'gh:logo': {
    html: container.querySelector('a.header-logo-invertocat'),
    create: function(options) {
      var element = this.html.cloneNode(true);
      if (options && options.hasOwnProperty('icon')) {
        var icon = element.querySelector('.mega-octicon');
        icon.className = 'mega-octicon octicon-' + options.icon;
        icon.styles = {
          float: 'left',
          width: '28px',
          height: '28px',
          fontSize: '28px'
        };
      }
      return element;
    }
  },

  'gh:search': {
    html: container.querySelector('div.site-search'),
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:pull-request': {
    html: container.querySelector('a[href="/pulls"]').parentElement,
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:issues': {
    html: container.querySelector('a[href="/issues"]').parentElement,
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:gist': {
    html: container.querySelector('a[href="https://gist.github.com/"]').parentElement,
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:notifications': {
    html: container.querySelector('a[href="/notifications"]').parentElement.parentElement,
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:new': {
    html: container.querySelector('a[href="/new"]').parentElement,
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:user': {
    html: container.querySelector('a.header-nav-link.name').parentElement,
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'link': {
    create: function(options) {
      var element = document.createElement('li');
      element.attr('class', 'header-nav-item');
      element.appendChild(document.createElement('a').attr('class', 'header-nav-link'));
      var link = element.find('a');
      link.attr('href', options.href);

      if (options.hasOwnProperty('icon')) {
        link.addClass('tooltipped');
        link.addClass('tooltipped-s');
        link.attr('aria-label', options.label);
        var icon = document.createElement('span');
        element.attr('class', 'octicon');
        icon.addClass('octicon-' + options.icon);
        link.append(icon);
      } else {
        link.html(options.label);
      }

      return element[0];
    }
  }
};

function appendTo(root, nodes) {
  for (let node of nodes) {
    switch (typeof(node)) {
      case 'string':
        root.appendChild(defaultElements[node].create());
        break;
      case 'object':
        var key = Object.keys(node)[0]; // gh:user-nav ... custom
        var options = node[key]; // Array of gh:new ...

        root.appendChild(defaultElements[key].create(options));
        break;
    }
  }
}

function run(config) {
  // Clear container
  container.innerHTML = '';

  // Add custom elements
  appendTo(container, config);
}


chrome.storage.sync.get({
  'configJson': defaultConfigJson
}, function(items) {
  run(JSON.parse(items.configJson));
});
