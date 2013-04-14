// Whenever the content script is invoked send a message to the background
// script to enable the page action.
chrome.extension.sendRequest({}, function(response) {});