$(document).ready(function() {
	$("div.SharingService").click(function(event) {
	
		// Figure out which service was clicked.
		var ServiceId;
		var target = $(event.target);
		if (target.is(".SharingService")) {
			ServiceId = target.attr("id");
		}
		else {
			ServiceId = target.parent(".SharingService").attr("id");
		}

		// Get current tab.
		chrome.tabs.getSelected(null, function(tab) {
			// Get current tab URL.
			currentUrl = encodeURIComponent(tab.url);
			
			// Depending on which service was clicked, execute the 
			// appropriate sharing logic.
			switch(ServiceId) {
				case "FbShare":
					var redirectUrl = encodeURIComponent("https://simpleshare-gae.appspot.com/LandingPages/RedirectedFromFacebook.html");
					var shareUrl = "https://www.facebook.com/dialog/feed?app_id=590308774312476&display=popup&redirect_uri=" + redirectUrl + "&link=" + currentUrl;
					chrome.windows.create({'url': shareUrl, 'width':580, 'height': 400, 'type': 'popup'});
					break;
				case "TwitterShare":
					var intentUrl = "https://twitter.com/intent/tweet?url=" + currentUrl;
					chrome.windows.create({'url': intentUrl, 'width':550, 'height': 420, 'type': 'popup'});
					break;
				case "GPlusShare":
					var shareUrl = "https://plus.google.com/share?url=" + currentUrl;
					chrome.windows.create({'url': shareUrl, 'width':550, 'height': 420, 'type': 'popup'});
					break;
				case "EmailShare":
					chrome.extension.getBackgroundPage().createMail(currentUrl); 
					break;
			}
		});
	});
});