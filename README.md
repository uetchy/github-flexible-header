# Github Flexible Header

Customize Github header items in JSON.

![Screenshot](http://randompaper.co.s3.amazonaws.com/gfh-ss1.png)
![Screenshot](http://randompaper.co.s3.amazonaws.com/gfh-ss2.png)

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
