let pushpin = require('../../dist/index');
let subscribeBtn = document.querySelector('#subscribe');
let unsubscribeBtn = document.querySelector('#unsubscribe');
subscribeBtn.addEventListener('click', function(e) {
	// Ask the user to authorize push notifications.
	// The argument is the path to the worker file
	// that will handle incoming push notifications.
	// This file *must* be in the root directory.
	pushpin.subscribe('/push-worker.js')
	// When push notifications are accepted, we get
	// back the users push notification token
	.then(function(userToken) {
		// Send that token to the server so that it
		// can be used to send push notifications to
		// this user.
		let req = new Request('/push/subscribe', {
			method: 'POST',
			body: JSON.stringify({token: token}),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		});
		fetch(req).then(res => {
			console.log('Saved token successfully');
		});
	})
	// If there was an error (ie. push notifications
	// are not supported in this browser) respond
	// appropriately.
	.catch(function(err) {
		console.log('Something bad happened', err);
	});
});

unsubscribeBtn.addEventListener('click', function(e) {
	pushpin.unsubscribe()
	// When we are done unsubscribing we get
	// back the users push notification token
	.then(function(userToken) {
		// Send that token to the server so that it
		// is removed from the subscription list.
		let req = new Request('/push/unsubscribe', {
			method: 'POST',
			body: JSON.stringify({token: token}),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		});
		fetch(req).then(res => {
			console.log('Unsubscribe successful');
		});
	})
	// If there was an error respond appropriately.
	.catch(function(err) {
		console.log('Something bad happened', err);
	});
});