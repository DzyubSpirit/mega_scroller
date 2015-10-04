// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  // console.log('Turning ' + tab.url + ' red!');
window.onload = function() {
	console.log('0');
	// chrome.tabs.executeScript(null, {
	// 	file: "init.js"
	// });
	var button = document.getElementById('button');
	var disButton = document.getElementById('disButton');

	button.onclick = function() {
		chrome.tabs.executeScript(null, {
			file: "popup.js"
		});
	}

	disButton.onclick = function() {
		chrome.tabs.executeScript(null, {
			file: "popdown.js"
		});
	}

}
// });