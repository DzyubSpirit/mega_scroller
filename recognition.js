// console.log('1');
	console.log('1');
	var recognition;
	var scrolling = false;
	var scrollingTimer;
	
	MyRecognition();

	// recognition.onend = function(event) {
	// 	console.log("no result");
	// 	console.log(event);
	// }

function MyRecognition() {
	try{
		recognition = new webkitSpeechRecognition();
	}
	catch(ex){
		console.log("This browser does not have support for webspeech api");
	}
	recognition.lang = "ru";
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = function(event) {
		console.log(event.results);
		// if (!scrolling && ["scroll", "girl", "grow", "screw", "through", "throw", "Chrome", "go", "picture", "Astro"].indexOf(event.results[0][0].transcript) != -1) {
		if (!scrolling && ["дальше", "вперед", "перед", "период"].indexOf(event.results[0][0].transcript) != -1) {
			scrolling = true;
			scrollingTimer = setInterval(function() { window.scrollTo(0, window.scrollY+2); }, 100);
			// recognition.stop();
			// MyRecognition();
			// recognition.abort();
		} else if (scrolling && ["стоп", "стол"].indexOf(event.results[0][0].transcript) != -1) {
			scrolling = false;
			clearInterval(scrollingTimer);
			// recognition.stop();
			// MyRecognition();
			// recognition.abort();



		}
	}
	recognition.start();

}
