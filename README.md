# Employee-Cafe

## Getting Started

To run Node Backend application using Docker, follow the steps below:

### Prerequisites

Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
Ensure you have Docker installed on your machine. You can download it from [docker.com](https://www.docker.com/).

### Start - Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/Sathathinesh/Employee-Cafe.git
   cd Employee-Cafe

2. Build and Run the Application:
    ```bash
   docker-compose up --build

3. Ports:
    ```bash
   Backend - 8088 
   Frontend - 5173 (http://localhost:5173)


### Installation - Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/Sathathinesh/Employee-Cafe.git
   cd cafe-employee-backend

2. Install the dependencies:
   ```bash
   npm install

3. Seeding the Database [ Make sure MySQL is installed and connected]:
    ```bash
    node seed.js

4. Running the Application:
    ```bash
    node app.js



### Installation - Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/Sathathinesh/Employee-Cafe.git
   cd cafe-employee-manager-frontend

2. Install the dependencies:
   ```bash
   npm install

3. Running the Application:
    ```bash
    npm run dev
    


