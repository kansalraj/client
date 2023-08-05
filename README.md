
```markdown
# Wallet System Frontend

## Overview

This is the frontend of the Wallet System web application. It provides a user interface for users to manage their wallets, perform transactions, and view transaction history.

## Features

- Create and initialize a new wallet with an initial balance.
- Credit or debit the wallet with a specified amount and description.
- View wallet balance and name.
- View transaction history with pagination and sorting options.
- Export transaction history to a CSV file.

## Tech Stack

- React.js - Frontend framework
- Material-UI - UI components and styling
- Axios - HTTP client for API requests
- react-csv - CSV export functionality

## Prerequisites

Before running the frontend, make sure you have the following installed on your machine:

- Node.js (v14 or above)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/kansalraj/client.git
```

2. Navigate to the project directory:

```bash
cd wallet-system-frontend
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000` in your web browser.

## Configuration

By default, the frontend is set up to connect to the backend API running at `http://localhost:4000`. If your backend API is hosted elsewhere, you can update the API endpoint in the source code.

## Folder Structure

```
├── public/           # Static files and index.html
├── src/              # Source code
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── App.js        # Main application component
│   ├── index.js      # Entry point
│   └── ...           # Other utility files
├── package.json      # Project configuration and dependencies
└── README.md         # Project documentation
```

## Contributing

If you find any issues with the frontend or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

The frontend of this application was created by Ankit Kansal (ankit.kansal1608@gmail.com)

```
