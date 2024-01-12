import client from './PocketbaseService';

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

const isLoggedIn = () => {
    return client.authStore.baseToken != "";
};

const authenticate = async (username, password) => {
    try {
        let authData = await client.collection('users').authWithPassword(username, password);
        return client.authStore.isValid;
    } catch (e) {
        return false;
    }
};

const createBusiness = async (businessData) => {
    try {
        const userId = client.authStore.baseModel.id;
        businessData.creator = userId;

        const createdBusiness = await client.collection('business').create(businessData);

        console.log("Business created:", createdBusiness);
    } catch (error) {
        console.error("Error creating business:", error);
    }
};

const createRating = async (ratingData) => {
    try {
        const userId = client.authStore.baseModel.id;
        ratingData.creator = userId;

        const createdRating = await client.collection('ratings').create(ratingData);

        console.log("Rating created:", ratingData);
    } catch (error) {
        console.error("Error creating rating:", error);
    }
};

const fetchRatingsByBusinessId = async (businessId) => {
    const ratings = await client.collection('ratings').getFullList({
        filter: 'business = "' + businessId + '"',
        expand: "creator"
    });

    return ratings;
};

export { fetchAllBusinesses, authenticate, createBusiness, createRating, isLoggedIn, fetchRatingsByBusinessId };