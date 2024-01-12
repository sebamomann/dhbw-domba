import PocketBase from 'pocketbase';

const client = new PocketBase('https://pocketbase.sebamomann.de'); // Replace with your actual Pocketbase URL
client.autoCancellation(false);

export default client;