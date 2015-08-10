'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == 'getConfigJson') {
    chrome.storage.sync.get('configJson', function(items){
      sendResponse({data: items.configJson});
    });
  } else {
    sendResponse({});
  }
});
