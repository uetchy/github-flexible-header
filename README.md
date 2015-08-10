# Github Flexible Header

Customize Github header items in JSON.

Available at [Chrome Web Store](https://chrome.google.com/webstore/detail/github-flexible-header/klnjbcfjjlikldnnkfflnhcaimapgglf).

## Screenshots

![Screenshot](http://randompaper.co.s3.amazonaws.com/gfh-ss1.png)
![Screenshot](http://randompaper.co.s3.amazonaws.com/gfh-ss2.png)

## JSON Examples

This will add __Personal Access Tokens__ and __Starred repositories__ links.

```json
[
  "gh:logo",
  "gh:search",
  {"gh:nav": [
    "gh:pull-request",
    "gh:issues",
    "gh:gist",
    {"link": {
      "label": "Tokens",
      "href": "https://github.com/settings/tokens"
    }}
  ]},
  {"gh:user-nav": [
    {"link": {
      "label": "Starred repositories",
      "href": "https://github.com/stars",
      "icon": "star"
    }},
    "gh:notifications",
    "gh:new",
    "gh:user"
  ]}
]
```

## Build & Archive extension

```
$ npm install
$ npm start # start watching files
$ npm run archive # generate extension file into /pkg
```
