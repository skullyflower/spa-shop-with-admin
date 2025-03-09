# spa-shop

This project is a single-page application (SPA) built with React and TypeScript. It serves as an online shop where users can browse products, add them to a shopping cart, and manage their cart.

## Project Structure

The project is organized as follows:

```
spa-shop
├── src
│   ├── state
│   │   ├── cartData.ts       # Manages shopping cart state
│   │   └── shopData.ts       # Contains product data
│   ├── components
│   │   ├── Header.tsx        # Header component
│   │   ├── Footer.tsx        # Footer component
│   │   └── ProductList.tsx   # Product list component
│   ├── pages
│   │   ├── Home.tsx          # Home page component
│   │   ├── Product.tsx       # Product detail page component
│   │   └── Cart.tsx          # Shopping cart page component
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Entry point of the application
├── public
│   ├── index.html            # Main HTML file
│   └── favicon.ico           # Favicon for the application
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Features

- **Product Browsing**: Users can view a list of products.
- **Shopping Cart**: Users can add products to their cart, view the cart, and remove items.
- **Responsive Design**: The application is designed to work on various screen sizes.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd spa-shop
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

## Technologies Used

- React
- TypeScript
- Zustand (for state management)
- CSS for styling

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.