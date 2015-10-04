console.log('1');
var recognition;
var scrolling = false;
var scrollingForward;
// console.log(scrolling);
var scrollingTimer;
var neededMicro;
var speed = 8;
var animation = false;
var animationImg;
var animationDiv;
var animationTimer;
var readyToRemove = false;
var toCloseTimer;

MyRecognition();

function MyRecognition() {
	neededMicro = true;
	try{
		recognition = new webkitSpeechRecognition();
	}
	catch(ex){
		console.log("This browser does not have support for webspeech api");
	}
	recognition.lang = "ru";
	recognition.continuous = false;
	recognition.interimResults = false;

	// console.log(recognition);

	recognition.onsoundstart = function(event) {
		console.log('sound START');
		animation = true;
		
		if (readyToRemove) {
			clearTimeout(toCloseTimer);
			clearInterval(animationTimer);
			animationImg.remove();
			animationDiv.remove();
		}

		var div = document.createElement('img');
		animationImg = div;
		div.src = chrome.extension.getURL('micro.png');
		div.style.position = 'fixed';
		div.style.left = '0px';
		div.style.top = (screen.height-400)+'px';
		div.style.width = '100px';
		div.style.height = '100px';
		// div.style.backgroundColor = '#f93';
		document.body.appendChild(animationImg);


		var div = document.createElement('div');
		animationDiv = div;
		div.style.zIndex = animationImg.style.zIndex;
		animationImg.style.zIndex = div.style.zIndex+1;
		div.style.backgroundColor = '#63f';
		div.style.position = 'fixed';
		div.style.left = Math.floor(parseInt(animationImg.style.width)/2) + 'px';
		div.style.top = (screen.height-400+Math.floor(parseInt(animationImg.style.height)/2))+'px';
		div.style.width = '0px';
		div.style.height = '0px';
		document.body.appendChild(div);
		animationTimer = setInterval(function() {
			animationDiv.style.width = parseInt(animationDiv.style.width)+4+'px';
			animationDiv.style.height = parseInt(animationDiv.style.height)+4+'px';
			if (parseInt(animationDiv.style.width) > parseInt(animationImg.style.width)) {
				animationDiv.style.width = animationImg.style.width;
			} else {
				animationDiv.style.left = parseInt(animationDiv.style.left) - 2 + 'px';
			}
			if (parseInt(animationDiv.style.height) > parseInt(animationImg.style.height)) {
				animationDiv.style.height = animationImg.style.height;
			} else {
				animationDiv.style.top = parseInt(animationDiv.style.top) - 2 + 'px';
			}
		}, 30);
		

		
	}

	recognition.onsoundend = function(event) {
		console.log('sound end');
		animation = false;
		readyToRemove = true;
		toCloseTimer = setTimeout(function() { 
			clearInterval(animationTimer);
			animationImg.remove();
			animationDiv.remove();
			readyToRemove = false;
		}, 2000);
	}

	recognition.onresult = function(event) {
		console.log(event.results);
		// if (!scrolling && ["scroll", "girl", "grow", "screw", "through", "throw", "Chrome", "go", "picture", "Astro"].indexOf(event.results[0][0].transcript) != -1) {
		var pr = true;
		if (["дальше", "вперед", "перед", "период", "вниз"].indexOf(event.results[0][0].transcript) != -1) {
			if (scrolling) {
				clearInterval(scrollingTimer);
			} else {
				speed = 8;
			}

			scrolling = true;
			scrollingForward = true;
			// console.log(scrolling);
			scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY+speed); }, 30);
			// console.log(scrollingTimer);
			// recognition.abort();
		} else if (["назад", "вверх"].indexOf(event.results[0][0].transcript) != -1) {
			if (scrolling) {
				clearInterval(scrollingTimer);
			} else {
				speed = 8;
			}

			scrolling = true;
			scrollingForward = false;
			// console.log(scrolling);
			scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY-speed); }, 30);
			// console.log(scrollingTimer);
		} else if (["медленно", "улитка"].indexOf(event.results[0][0].transcript) != -1) {
			if (scrolling) {
				clearInterval(scrollingTimer);
			}

			speed = 1;
			scrolling = true;
			if (scrollingForward) {
				scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY+speed); }, 30);
			} else {
				scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY-speed); }, 30);
			}
		} else if (["быстро", "фастом", "шустро", "faststone"].indexOf(event.results[0][0].transcript) != -1) {
			if (scrolling) {
				clearInterval(scrollingTimer);
			}
			speed = 33;
			scrolling = true;
			if (scrollingForward) {
				scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY+speed); }, 30);
			} else {
				scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY-speed); }, 30);
			}
		} else if (["норм", "норм так"].indexOf(event.results[0][0].transcript) != -1) {
			if (scrolling) {
				clearInterval(scrollingTimer);
			}
			speed = 8;
			scrolling = true;
			if (scrollingForward) {
				scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY+speed); }, 30);
			} else {
				scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY-speed); }, 30);
			}
		} else {
			if (scrolling) {
				if (["стоп", "стол"].indexOf(event.results[0][0].transcript) != -1) {
					scrolling = false;
					speed = 8;
					// console.log(scrolling);
					// console.log(scrollingTimer);
					clearInterval(scrollingTimer);
					// recognition.abort();
				} else if (["быстрее", "шустрее"].indexOf(event.results[0][0].transcript) != -1) {
					speed *= 2;
					if (speed > 30) {
						speed /= 2.0;
					}
				} else if (["потише", "медленнее", "посещение"].indexOf(event.results[0][0].transcript) != -1) {
					speed /= 2.0;
					if (speed < 1) {
						speed *= 2;
					}
				} else {
					pr = false;
				}
			} else {
				pr = false;
				animationDiv.style.backgroundColor = '#f63';

			}
		}
		if (pr) {
			recognition.stop();
			MyRecognition();
			animationDiv.style.backgroundColor = '#6f3';

		} else if (["глаз долой", "с глаз долой", "сглаз долой", "выход"].indexOf(event.results[0][0].transcript) != -1) {
			neededMicro = false;
			recognition.stop();
			if (scrolling) {
				scrolling = false;
				clearInterval(scrollingTimer);
			}
			animationDiv.style.backgroundColor = '#6f3';
		} else {
			animationDiv.style.backgroundColor = '#f63';
		}
	}

	recognition.onaudioend = function(event) {
		recognition.stop();
		if (neededMicro) {
			MyRecognition();
		}
	}

	recognition.start();

}
