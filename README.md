# pushpin

A client side library for doing web based push notifications.

The [example](example) is a good place to start. It's well commented.

### Methods

#### pushpin.subscribe(workerPath, options={})

The subscribe method requests permission to send push notifications to the user's device and returns a promise. The promise will resolve with the push notification token that can be used to send notifications from a server.

#### pushpin.unsubscribe()

Unsubscribes a user from push notifications and returns a promise. The promise will resolve with the push notification token that was previously used.

