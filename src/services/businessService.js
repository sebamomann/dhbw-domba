import client from './PocketBaseService';

const fetchAllBusinesses = async () => {
    const businesses = await client.collection('business').getFullList({
        sort: '-created',
    });

    // Fetch and calculate average ratings for each business
    const businessesWithRatings = await Promise.all(businesses.map(async (business) => {
        const ratings = await client.collection('ratings').getFullList({
            filter: `business = "${business.id}"`,
        });

        // Calculate the average rating
        const averageRating = ratings.reduce((sum, rating) => sum + rating.stars, 0) / ratings.length;

        // Return business with its average rating
        return {
            ...business,
            averageRating: isNaN(averageRating) ? 0 : averageRating,
        };
    }));

    return businessesWithRatings;
};

const createBusiness = async (businessData) => {
    try {
        const userId = client.authStore.model.id;
        businessData.creator = userId;

        const createdBusiness = await client.collection('business').create(businessData);

        console.log("Business created:", createdBusiness);
    } catch (error) {
        console.error("Error creating business:", error);
    }
};

const createRating = async (ratingData) => {
    try {
        const userId = client.authStore.model.id;
        ratingData.creator = userId;

        const createdRating = await client.collection('ratings').create(ratingData);

        console.log("Rating created:", ratingData);
    } catch (error) {
        console.error("Error creating rating:", error);
    }
};

const getBusinessById = async (businessId) => {
    const business = await client.collection('business').getOne(businessId);

    const ratings = await client.collection('ratings').getFullList({
        filter: `business = "${business.id}"`,
    });

    // Calculate the average rating
    const averageRating = ratings.reduce((sum, rating) => sum + rating.stars, 0) / ratings.length;

    // Return business with its average rating
    return {
        ...business,
        averageRating: isNaN(averageRating) ? 0 : averageRating,
    };
};

const fetchRatingsByBusinessId = async (businessId) => {
    const ratings = await client.collection('ratings').getFullList({
        filter: 'business = "' + businessId + '"',
        expand: "creator"
    });

    return ratings;
};

const subscribeForPushNotifications = async () => {
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

        if (await isSubscribed()) {
            console.log("Existing subscription detected");
            return; // Optionally, you could return or use the existing subscription
        }

        // Subscribe for push notifications
        const pushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            // Replace with your public VAPID key
            applicationServerKey: 'BI-BcJsyQSKp_uXEC1FmFKW-rhpzw08wLITNfh9eCZydjvLDtL3jyBCQRITxcCOdjdif_DAY29_Ken09Lg75jrU'
        });

        // Send subscription to PocketBase
        await client.collection('subscriptions').create({
            user: userId,
            subscription: pushSubscription
        });

        console.log('Push notification subscription successful');
    } catch (error) {
        console.error('Failed to subscribe for push notifications:', error);
    }
};

const isSubscribed = async () => {
    const registration = await navigator.serviceWorker.ready;

    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
        console.log("Existing subscription detected:", existingSubscription);
        return existingSubscription; // Optionally, you could return or use the existing subscription
    }
};



export { fetchAllBusinesses, createBusiness, createRating, fetchRatingsByBusinessId, subscribeForPushNotifications, isSubscribed, getBusinessById };