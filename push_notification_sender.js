import PocketBase from 'pocketbase';
import webPush from 'web-push';
import EventSource from 'eventsource';

// Configure global EventSource polyfill
global.EventSource = EventSource;

// Initialize PocketBase client
const pocketBaseClient = new PocketBase('___');

// Web push notification options
const webpushOptions = {
    vapidDetails: {
        subject: '___',
        publicKey: "___",
        privateKey: "___"
    },
    TTL: 60 * 60 * 24 // 24 hours in seconds
};

// Send push notification to a subscription
async function sendPushNotification(subscription, payload) {
    try {
        const response = await webPush.sendNotification(subscription, JSON.stringify(payload), webpushOptions);
        console.log("Notification sent successfully:", response);
    } catch (err) {
        console.error("Error sending notification:", err);
    }
}

// Main function to run the application
async function run() {
    try {
        // Subscribe to updates in the 'ratings' collection
        pocketBaseClient.collection('ratings').subscribe('*', async (event) => {
            try {
                const record = event.record;
                const businessId = record.business; // Adjust field name as needed

                // Fetch the related business
                const business = await pocketBaseClient.collection('business').getOne(businessId);

                // Construct filter for fetching subscriptions
                const filter = `user.id = '${business.creator}'`;
                const subscriptionData = await pocketBaseClient.collection('subscriptions').getList(1, 10, { filter });
                const subscriptions = subscriptionData.items;

                // Notification payload
                const notificationPayload = {
                    notification: {
                        title: `Neue Bewertung für ${business.name}`,
                        body: `Dein Unternehmen hat eine ${record.stars} Sterne Bewertung erhalten!`,
                        icon: '/icons/icon-128x128.png', // Adjust as needed
                    },
                };

                // Send notifications to all subscriptions
                subscriptions.forEach(sub => sendPushNotification(sub.subscription, notificationPayload));
            } catch (error) {
                console.error('Error processing rating update event:', error);
            }
        });
    } catch (error) {
        console.error('Error initializing subscription:', error);
    }
}

run();
