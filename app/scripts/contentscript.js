'use strict';

var $ = require('jquery');
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
    html: $(container).find('ul.header-nav.left')[0],
    create: function(children) {
      var element = this.html;
      element.innerHTML = '';
      appendTo(element, children);
      return element.cloneNode(true);
    }
  },

  'gh:user-nav': {
    html: $(container).find('ul.header-nav.user-nav.right')[0],
    create: function(children) {
      var element = this.html;
      element.innerHTML = '';
      appendTo(element, children);
      return element.cloneNode(true);
    }
  },

  'gh:logo': {
    html: $(container).find('a.header-logo-invertocat')[0],
    create: function(options) {
      var element = this.html.cloneNode(true);
      if (options.icon) {
        var icon = element.querySelector('.mega-octicon');
        icon.className = 'mega-octicon octicon-' + options.icon;
        icon.styles = {
          float: 'left',
          width: '28px',
          height: '28px',
          fontSize: '28px'
        }
      }
      return element;
    }
  },

  'gh:search': {
    html: $(container).find('div.site-search')[0],
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:pull-request': {
    html: $(container).find('li:has(a[href="/pulls"])')[0],
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:issues': {
    html: $(container).find('li:has(a[href="/issues"])')[0],
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:gist': {
    html: $(container).find('li:has(a[href="https://gist.github.com/"])')[0],
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:notifications': {
    html: $(container).find('li:has(a[href="/notifications"])')[0],
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:new': {
    html: $(container).find('li:has(a[href="/new"])')[0],
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'gh:user': {
    html: $(container).find('li:has(a.header-nav-link.name)')[0],
    create: function() {
      return this.html.cloneNode(true);
    }
  },

  'link': {
    create: function(options) {
      var element = $('<li class="header-nav-item"><a class="header-nav-link"></a></li>');
      var link = element.find('a');
      link.attr('href', options.href);

      if (options.icon) {
        link.addClass('tooltipped');
        link.addClass('tooltipped-s');
        link.attr('aria-label', options.label);
        var icon = $('<span class="octicon"></span>');
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
