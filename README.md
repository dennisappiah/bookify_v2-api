<div align="center">
  <p align="center">
    Bookify
    <br />
    <a href="https://github.com/dennisappiahALX/bookify_v2-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

![alt text](./read.png)

# What it does

Bookify is an online Book rental platform with seeks to solve of problem of difficult access to books due to high
costs. Bookify is an model application that serves as a library for all categories of books released on rental basis for small daily rental fee.

If you're interested in easy access to collection of books based on your preference , Bookify is the one stop place. With a simple interface, you can upload a book for others to rent market.

Key Features:

- App supports authentication and Authorization through CRUD operations
- Authenticated users have POST permissions(authorization) on the categories endpoint and GET permission on
  current user endpoint
  /api/categories
  /api/users/me
- Only authenticated admin users have delete authorization to delete a request at accepted endpoint
  /api/categories/:id
- Unauthenticated users do not have accesss to the platform till they are logged in.

# Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [ExpressJs](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [MongoDb](https://www.mongodb.com/home)

# Getting started

The project consist of the backend and also the front end.

### Prerequisites

- nodejs installed
- npm
- Hardhat

```
npm install npm@latest -g
npm install -g hardhat
```

### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```
git clone https://github.com/dennisappiahALX/bookify_v2-api

cd nftproject

# install using NPM or Yarn
npm install

# or

yarn
```

2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License

Distributed under the MIT License.

# Contact

- Dennis Appiah - https://twitter.com/dennisapiah -->
