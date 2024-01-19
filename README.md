# Business  Reviews

## Idea
The basic idea of this web application lies in the possibility for business to advertise themselves. A customer searching for a business (e.g. a place to eat) can see all (nearby) restaurants and get insights into their menu. Also, the user can get firsthand information from other customers. Each customer has the possibility to rate the business on a scale from one to five (stars).

## Use Cases

## Implementation

To set up the backend (and database), a publicly available docker image has been used in connection with a docker-compose file. In this case *pocketbase* has been used. The docker-compose looks as follows 

```yml
version: '2'
services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    container_name: pocketbase
    restart: unless-stopped
    command:
      - --encryptionEnv #optional
      - ENCRYPTION #optional
    environment:
      - ENCRYPTION=example #optional
    ports:
      - "8090:8090"
    volumes:
      - /var/www/vhosts/V_HOST>/pocketbase/data:/pb_data

```

### Push Notification

Instead of a cloud or server function, a locally running node script has been used to listen on changes to a pocketbase collection to trigger push notifications. This script can be seen in [push_notification_sender.js](./push_notification_sender.js). 

**Replace the vapid information first**.

### React App

#### Startup

To start the application (in local dev mode) simply run `npm run-script start`

#### Structure

Application entrypoint is located in [MainAppComponent](./src/components/MainAppComponent.jsx). It serves as base component serving pages requested by the path, depending on the defined [routes](./src/js/routes.js). Each route points to a different page that will be opened when requested. All pages can be seen in the [pages](./src/pages/) directory.

The most important page is the [HomePage](./src/pages/HomePage.jsx) which contains a component for rendering a ([BusinessList](./src/components/BusinessList.jsx)). Each item of this [BusinessList](./src/components/BusinessList.jsx) is represented as [BusinessItem](./src/components/BusinessItem.jsx). [BusinessItem](./src/components/BusinessItem.jsx) is a component used to represent crucial information about the business like its name, description, contact information and an image. Furthermore, it contains information about customer ratings.

A [BusinessItem](./src/components/BusinessItem.jsx) serves as entrypoint to a different page. The [BusinessPage](./src/pages/BusinessPage.jsx), available under the `/business/:id` path, is a representation of the business requested by its id. The [BusinessPage](./src/pages/BusinessPage.jsx) reuses the [BusinessItem](./src/components/BusinessItem.jsx) component to give information about the requested business. In addition to the  [BusinessItem](./src/components/BusinessItem.jsx), the [BusinessPage](./src/pages/BusinessPage.jsx) also contains a [RatingsList](./src/components/RatingsList.jsx) with all ratings created for this business, reach rating represented by a comment and a 1-5 star rating. New ratings can be created by the [RatingsPopup](./src/components/RatingPopup.jsx), which can also be opened from within the [BusinessPage](./src/components/BusinessPage.jsx).

Going back to the [HomePage](./src/pages/HomePage.jsx), a different page can be called. The [CreateBusinessPage](./src/pages/CreateBusinessPage.jsx) is accessible through the `/create` path and offers the ability to create a new business. The form itself is straightforward and is not extracted into its dedicated component.

Also, from the [HomePage](./src/pages/HomePage.jsx) and when trying to rate a business, the [LoginPage](./src/pages/LoginPage.jsx) represented by the `/login` path, will be opened. This form also does not require a dedicated component for the form. Then logged in, the [ProfilePage](./src/pages/ProfilePage.jsx) can be accessed.