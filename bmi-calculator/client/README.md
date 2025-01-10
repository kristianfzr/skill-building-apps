# BMI Calculator

This project is a BMI (Body Mass Index) Calculator application built with a React frontend and an Express backend. The frontend is powered by Vite for fast development and the backend uses Express to handle BMI calculations.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [License](#license)

## Technologies

This project utilizes the following technologies:

- **React** for creating user interfaces.
- **Vite** for fast development and build.
- **Express** for backend logic.
- **Axios** for making HTTP requests.
- **ESLint** for linting JavaScript and JSX code.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd bmi-calculator
    ```

2. Install dependencies for the backend:
    ```sh
    cd backend
    npm install
    ```

3. Install dependencies for the frontend:
    ```sh
    cd ../client
    npm install
    ```

## Usage

### Running the Backend

1. Start the backend server:
    ```sh
    cd backend
    npm run dev
    ```

   The backend server will start on `http://localhost:5000`.

### Running the Frontend

1. Start the frontend development server:
    ```sh
    cd client
    npm run dev
    ```

   The frontend development server will start on `http://localhost:3000`.

### Calculating BMI

1. Open the frontend application in your browser.
2. Enter your height (in cm) and weight (in kg).
3. Click the "Calculate BMI" button to see your BMI and category.