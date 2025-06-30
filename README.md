# SuperDuper Balance Checker

A full-stack application for checking token balances on different blockchain networks. This project is a monorepo containing a React frontend and a Node.js/Express backend API.

## Table of Contents
* [Requirements](#requirements)
* [Getting Started](#getting-started)
  * [Running with Docker](#running-with-docker)
  * [Running Locally](#running-locally)
* [Available Scripts](#available-scripts)
* [Testing](#testing)
* [Database Administration](#database-administration)

## Requirements
- Node.js >= v22.17.0
- PostgreSQL
- Docker (for containerized setup)

## Getting Started

### Running with Docker
The easiest way to get the application running is by using Docker.

1.  Ensure Docker is running on your machine.
2.  From the project root, run the following command to build and start the services:
    ```sh
    docker-compose up --build
    ```
The web app will be available at `http://localhost:4173` and the API at `http://localhost:3000`.

### Running Locally
1.  Clone the repository.
2.  Install root dependencies:
    ```sh
    npm install
    ```
3.  Create `.env` files in `/apps/api` and `/apps/web`. You can use the `.env-example` files in each directory as a template.
4.  Ensure your local PostgreSQL server is running.
5.  Initialize the database (this will create, migrate, and seed the database):
    ```sh
    npm run dev:init
    ```
6.  Run the applications:
    ```sh
    npm start
    ```
    Alternatively, you can run each app in a separate terminal:
    ```sh
    # Terminal 1
    npm run dev:api

    # Terminal 2
    npm run dev:web
    ```

## Available Scripts
- `npm start`: Starts both the API and web applications concurrently.
- `npm run dev:api`: Starts the API server in development mode.
- `npm run dev:web`: Starts the web application in development mode.
- `npm run dev:init`: Initializes the development database.
- `npm run drop-db`: Drops the development database.
- `npm run test`: Runs the test suite for the API.

## Testing
To run the automated tests for the API, run:
```sh
npm test
```

## Database Administration
Database administration is handled using the Sequelize CLI. For more information on its usage, refer to the [official documentation](https://github.com/sequelize/cli).

## Trade-offs and Potential Improvements


`POST /api/balance`

I decided to make this a `POST` request because every time you check a balance, it saves a record to the database. Even though the function on the frontend is called `getBalance` (which sounds like it should be a `GET` request), the backend is actually creating a new resource. It's a bit of a trade-off. Given more time, I would revisit this and other similar spots to make the API design more consistent. 

Given more time, several areas of the project could be enhanced. The most significant improvement would be to resolve all existing TypeScript errors. The Docker setup could also be improved to be more robust and production-ready. The current test suite is minimal and could be expanded with more tests. The user interface would benefit from UI/UX refinements, such as better loading state indicators and more descriptive error messages.

To get a working RPC URL, the app searches on Chainlist. It first checks if you have an Infura API key. If so, it uses Infura. If not, it falls back to Tenderly, which in my experience works pretty well. Given more time, I'd build a function to test the available RPCs to find the most reliable one.
