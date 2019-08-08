var localPreview = false;
try {
	localPreview = document.location === top.location;
}
catch (e) {}

function initializeLocalPreview() {
	var ua = navigator.userAgent;
	EB = {
		_adConfig: {
			adId: 0,
			rnd: 0,
			uid: 0
		},
		initExpansionParams: function() {
			return true;
		},
		setExpandProperties: function() {
			return true;
		},
		API: {
			os: {
				ios: ua.match(/ipod|iphone|ipad/i) !== null
			},
			setStyle: function(obj, styles) {
				for (var style in styles) {
					if (!styles.hasOwnProperty(style)) continue;
					obj.style[style] = styles[style];
				}
			}
		},
		getSDKData: function() {
			return null;
		},
		expand: function() {
			return true;
		},
		collapse: function() {
			return true;
		},
		clickthrough: function() {
			return true;
		},
		automaticEventCounter: function() {
			return true;
		},
		userActionCounter: function() {
			return true;
		}
	};
	EBG = {
		VideoModule: function(video) {
			return {
				_videoElement: video,
				playVideo: function() {
					this._videoElement.play();
				}
			};
		}
	};
	var visibilityStyle = document.createElement("style");
	visibilityStyle.innerHTML = "html, body, div, video {visibility: visible !important;}";
	document.getElementsByTagName("head")[0].appendChild(visibilityStyle);
}