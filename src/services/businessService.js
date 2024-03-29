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


export { fetchAllBusinesses, createBusiness, createRating, fetchRatingsByBusinessId, getBusinessById };