import client from "./PocketBaseService";

const isSubscribedToPush = async () => {
    const existingSubscription = await getCurrentPushSubscriptionIfExists();

    if (existingSubscription) {
        console.log("Existing subscription detected:", existingSubscription);
        return true; // Optionally, you could return or use the existing subscription
    } else {
        console.log("Not subscribed to Push");
    }

    return false;
};

const getCurrentPushSubscriptionIfExists = async () => {
    const registration = await navigator.serviceWorker.ready;

    return await registration.pushManager.getSubscription();
};

const subscribeToPush = async () => {
    const userId = client.authStore.model.id;

    try {
        // Check for service worker and push notification support
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            console.error("Push notifications are not supported in this browser.");
            return;
        }

        // Request permission for push notifications
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Permission not granted for Notification');
        }

        const registration = await navigator.serviceWorker.ready;

        if (await isSubscribedToPush()) {
            console.log("Existing subscription detected");
            return; // Optionally, you could return or use the existing subscription
        }

        // Subscribe for push notifications
        const pushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BI-BcJsyQSKp_uXEC1FmFKW-rhpzw08wLITNfh9eCZydjvLDtL3jyBCQRITxcCOdjdif_DAY29_Ken09Lg75jrU'
        });

        // Send subscription entry to PocketBase
        await client.collection('subscriptions').create({
            user: userId,
            subscription: pushSubscription
        });

        console.log('Push notification subscription successful');
    } catch (error) {
        console.error('Failed to subscribe for push notifications:', error);
    }
};

const unsubscribeFromPush = async () => {
    const userId = client.authStore.model.id;

    const existingSubscription = await getCurrentPushSubscriptionIfExists();
    const subscriptions = await client.collection('subscriptions').getFullList({
        filter: `user.id = '${userId}'`,
    });

    const subscription = subscriptions.find(e => existingSubscription.endpoint == e.subscription.endpoint);
    await client.collection('subscriptions').delete(subscription.id);

    existingSubscription.unsubscribe();
};




export { isSubscribedToPush, subscribeToPush, unsubscribeFromPush };