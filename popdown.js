console.log('2');
if ('recognition' in window && recognition != undefined) {
	neededMicro = false;
	recognition.stop();
}
if (scrolling) {
	scrolling = false;
	clearInterval(scrollingTimer);
}
