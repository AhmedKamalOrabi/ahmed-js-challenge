# JavaScript challenge Shore GmbH

Hi!
Thanks for applying to work as a frontend developer at Shore.
Most of our work is focused on adding new features to existing software.
We want you to add a new feature to this app so we can understand how you work
with code written by someone else.

**What is the app?**

The Moomin Hair Salon is building an app to manage their customers.
They just started building the app.
It only shows a list of existing customers.

Each customer has a name, an email or a phone number, and a list of the
customer's favorite services.
A service is something that the hair salon does for the customer, like washing
their hair.
You can see this in the browser by running `npm install` and then `npm start`.

**What is your job?**

The Moomin Hair Salon wants you to help them with the app. 

Unfortunately, the app foundation is a bit dusty. We think it's good to update it to TypeScript and use modern React approach before work on new features.

By the way, they need a way to add new customers and edit information for existing customers.
Here are their requirements:

1. There must be a way to create a new customer
1. There must be a way to update an existing customer
1. Every customer must have a valid phone number or a valid email address.
   The validation rules are up to you.
1. "Favorite services" should only be those services that the hair salon offers.
   See the section "API" for more information.
1. Customer information must be validated on the client side.

You are the expert, so the user experience is up to you!

**Installation**

This project was created with `create-react-app`.
To run the app, please first run `npm install` and then `npm start`.
More information is found below in the section "create-react-app"

**API**

We've created a fake api in `src/api.js`.
This module exposes some functions that might be useful:

- `getServices()`: get a list of the services
- `getCustomers()`: get a list of customers
- `createCustomer(customerData)`: create a new customer and returns
- `updateCustomer(id, customerData)`: update an existing customer

Don't be afraid to look in this file.
If you find a bug here, please let us know!

Here is an example customer:

```json
{
  "id": "92ad53b4-2961-11e9-bc5b-3b64d4a0eb7b",
  "name": "Little My",
  "email": "little.my@moomin.valley",
  "phone": "",
  "favoriteServices": [ "671819b1-2961-11e9-a8db-411a232c5a03" ],
}
```

Here is an example service:

```json
{
  "id": "671819b1-2961-11e9-a8db-411a232c5a03",
  "name": "Wash",
  "durationInMinutes": 15
}
```

**Styles**

You might have noticed that the app is using some strange html.
For example, `<shore-app-header>` isn't HTML5 and it's not a custom React
component either.
It's one of many web components that we created and use in the Shore app.
These components are consistent with our styleguide.
You can use those components for this project.
They are documented [here](https://assets-cdn.shore.com/shore-components/master/current/index.html).
You are also welcome to write your own styles.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
