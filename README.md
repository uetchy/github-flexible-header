# Flex Github Header

Customize Github header in JSON.

![Screenshot](http://randompaper.co.s3.amazonaws.com/fgh-ss1.png)

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
