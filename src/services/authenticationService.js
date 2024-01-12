import client from "./PocketBaseService";

const isUserAuthenticated = () => {
    return client.authStore.isValid;
};

const authenticateUser = async (username, password) => {
    try {
        let authData = await client.collection('users').authWithPassword(username, password);
        return client.authStore.isValid;
    } catch (e) {
        return false;
    }
};

const logoutUser = async () => {
    client.authStore.clear();
};

const getAuthenticatedUserData = () => {
    return client.authStore.model;
};

export { isUserAuthenticated, authenticateUser, getAuthenticatedUserData, logoutUser };