var defaultConfigJson = JSON.stringify([
  "gh:logo",
  "gh:search",
  {"gh:nav": [
    "gh:pull-request",
    "gh:issues",
    "gh:gist"
  ]},
  {"gh:user-nav": [
    "gh:notifications",
    "gh:new",
    "gh:user"
  ]}
], null, 2);

function notify(text) {
  var status = document.getElementById('status');
  status.textContent = text;
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

// Saves options to chrome.storage.sync.
function save_options() {
  var configJson = document.getElementById('configJson').value;
  chrome.storage.sync.set({
    configJson: configJson
  }, function() {
    // Update status to let user know options were saved.
    notify('Options saved.');
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    configJson: defaultConfigJson
  }, function(items) {
    document.getElementById('configJson').value = items.configJson;
  });
}

function reset_options() {
  document.getElementById('configJson').value = defaultConfigJson;
  save_options();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);
