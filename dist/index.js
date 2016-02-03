'use strict';

module.exports = {
	subscribe: function subscribe(workerPath) {
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		return new Promise(function (resolve, reject) {
			if (!('serviceWorker' in navigator)) {
				return reject('UNSUPPORTED');
			}

			if (!('PushManager' in window)) {
				return reject('UNSUPPORTED');
			}

			if (!('permissions' in navigator)) {
				return reject('UNSUPPORTED');
			}

			if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
				return reject('UNSUPPORTED');
			}

			navigator.serviceWorker.register(workerPath, options);
			navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
				return serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: options.userVisibleOnly || true });
			}).then(function (subscription) {
				var subscriptionId = getSubscriptionId(subscription.endpoint);
				if (!subscriptionId) {
					reject('UNKNOWN_SUBSCRIPTION_ID');
				} else {
					resolve(subscriptionId);
				}
			}).catch(reject);
		});
	},
	unsubscribe: function unsubscribe(options) {
		return new Promise(function (resolve, reject) {
			navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
				return serviceWorkerRegistration.pushManager.getSubscription();
			}).then(function (subscription) {
				// Check we have everything we need to unsubscribe
				if (!subscription) {
					return resolve(null);
				}

				subscription.unsubscribe().then(function (successful) {
					if (!successful) {
						reject('CANNOT_UNSUBSCRIBE');
					} else {
						resolve(getSubscriptionId(subscription.endpoint));
					}
				}).catch(reject);
			});
		});
	}
};

function getSubscriptionId(url) {
	return url.split('/').pop();
}