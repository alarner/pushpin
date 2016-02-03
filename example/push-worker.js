// Listen for any push events that get triggered
self.addEventListener('push', function(event) {
	var notificationOptions = {
		body: 'Lipsum',
		icon: '/images/touch/chrome-touch-icon-192x192.png',
		tag: 'simple-push-demo-notification',
		data: {url: 'http://test.com'}
	};
	// Display the notification
	return self.registration.showNotification('An example push notification', notificationOptions);
});
