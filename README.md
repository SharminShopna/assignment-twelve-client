# House Box

House Box is a comprehensive real estate platform built using the MERN stack. It enables users, agents, and admins to efficiently manage real estate transactions, reviews, and property listings. The platform provides a responsive design and seamless user experience across all devices.

## Key Features

1. **Multi-Role System**: Supports three user roles - User, Agent, and Admin.
2. **Secure Authentication**: Implements email/password-based authentication and social login with Firebase.
3. **Property Listings**: Users can browse all properties verified by admins and view detailed property information.
4. **Wishlist Functionality**: Allows users to add properties to their wishlist and make purchase offers.
5. **Agent Features**: Agents can add, update, and manage their properties, including viewing requested/offered properties.
6. **Admin Dashboard**: Admins can manage users, properties, and reviews with options to verify, reject, or advertise properties.
7. **Review System**: Users can add and manage reviews for properties.
8. **Stripe Payment Integration**: Users can securely make payments for properties.
9. **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
10. **Real-Time Notifications**: Uses SweetAlert2 for CRUD operation feedback and authentication status.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the client and server directories:
   ```bash
   cd client
   cd server
   ```
3. Install dependencies for both client and server:
   ```bash
   npm install
   ```
4. Create a `.env` file in both client and server directories with the required configurations:
   - Firebase configuration keys
   - MongoDB credentials
   - JWT secret
   - Stripe API keys

## Scripts

### Client
- Start development server:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Preview production build:
  ```bash
  npm run preview
  ```

### Server
- Start the server:
  ```bash
  npm start
  ```

## Dependencies

### Client-Side Dependencies
```json
{
  "@emailjs/browser": "^4.4.1",
  "@headlessui/react": "^2.2.0",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "aos": "^2.3.4",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "jsonwebtoken": "^9.0.2",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-helmet": "^6.1.0",
  "react-icons": "^5.4.0",
  "react-lottie": "^1.2.10",
  "react-router-dom": "^7.1.1",
  "react-tooltip": "^5.28.0",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.15.10"
}
```

### Client-Side Dev Dependencies
```json
{
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "daisyui": "^4.12.23",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "postcss": "^8.5.0",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.5"
}
```

### Server-Side Dependencies
```json
{
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.12.0",
  "morgan": "^1.10.0",
  "nodemailer": "^6.10.0",
  "stripe": "^17.5.0"
}
```

## Live Site
https://assignment-twelve-6bd21.web.app/


## Admin Credentials
- **AdminEmail**: shopnashopna@gmail.com
- **Password**: Ss12345

## Agent Credentials
- **AgentEmail**: fahimtamim@gmail.com
- **Password**: Ft12345


