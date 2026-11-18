# **BrewBuzz Frontend**

This repository contains the frontend code for the **BrewBuzz Café App**, a platform to connect coffee shop enthusiasts with local coffee businesses. The frontend is built using **React Native** and powered by **Expo** for seamless mobile development.

---

## **Prerequisites**

Before running the project, ensure you have the following installed on your machine:

1. **Node.js** (v16 or later)  
   - Download and install from [Node.js Official Website](https://nodejs.org/).
2. **npm** or **yarn** (comes with Node.js)  
   - Ensure npm is installed by running:
     ```bash
     npm -v
     ```
3. **Expo CLI**  
   - Install Expo CLI globally:
     ```bash
     npm install -g expo-cli
     ```
4. **Git**  
   - Ensure Git is installed to clone the repository:
     ```bash
     git --version
     ```
5. **Mobile Device or Emulator**  
   - **Expo Go App** (for Android/iOS): Download from the App Store or Play Store to preview the app.
   - Emulator: Install **Android Studio** or **Xcode** for testing on emulators.

---

## **Getting Started**

Follow these steps to run the BrewBuzz Frontend on your local machine:

Here’s the README.md written in Markdown format:

markdown
Copy code
# **BrewBuzz Frontend**

This repository contains the frontend code for the **BrewBuzz Café App**, a platform to connect coffee shop enthusiasts with local coffee businesses. The frontend is built using **React Native** and powered by **Expo** for seamless mobile development.

---

## **Prerequisites**

Before running the project, ensure you have the following installed on your machine:

1. **Node.js** (v16 or later)  
   - Download and install from [Node.js Official Website](https://nodejs.org/).
2. **npm** or **yarn** (comes with Node.js)  
   - Ensure npm is installed by running:
     ```bash
     npm -v
     ```
3. **Expo CLI**  
   - Install Expo CLI globally:
     ```bash
     npm install -g expo-cli
     ```
4. **Git**  
   - Ensure Git is installed to clone the repository:
     ```bash
     git --version
     ```
5. **Mobile Device or Emulator**  
   - **Expo Go App** (for Android/iOS): Download from the App Store or Play Store to preview the app.
   - Emulator: Install **Android Studio** or **Xcode** for testing on emulators.

---

## **Getting Started**

Follow these steps to run the BrewBuzz Frontend on your local machine:

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/brewbuzz-frontend.git
cd brewbuzz-frontend
2. Install Dependencies
Install all required packages using npm or yarn:

bash

npm install
or

bash

yarn install
3. Start the Expo Server
Run the Expo development server:

bash

expo start
4. Preview the App
Using a Physical Device:

Open the Expo Go App on your Android/iOS device.
Scan the QR code displayed in the terminal or Expo Developer Tools in your browser.
Using an Emulator:

Ensure your emulator is running (Android Studio or Xcode).
Press a (for Android) or i (for iOS) in the terminal to open the app on the emulator.
Project Structure
plaintext
Copy code
├── assets/          # Static assets like images, fonts, etc.
├── components/      # Reusable UI components
├── screens/         # Screen components for the app (e.g., HomePage, LoginScreen)
├── styles/          # Shared styling files
├── App.js           # Entry point for the app
├── package.json     # Project configuration and dependencies
└── README.md        # Project documentation
Key Features
Coffee Shop Discovery: View a list of nearby coffee shops with detailed profiles.
Filters: Apply filters like "Open Now," "Price," and "Rating."
Favorites: Mark coffee shops as favorites for quick access.
User-Friendly Navigation: Intuitive bottom navigation bar with icons.
Environment Variables
If your project interacts with a backend or uses API keys, set up a .env file in the root directory with the following variables:


API_BASE_URL=https://your-api-url.com
Common Commands
Command	Description
npm install	Install project dependencies
expo start	Start the development server
expo start -c	Start the server and clear the Metro cache
expo build	Build the app for production (requires Expo Go)
Troubleshooting
Metro Bundler Issues
If you encounter issues with Metro Bundler:

Clear the cache:
bash

expo start -c
Restart the development server.
Port Already in Use
If Expo reports that the default port (8081) is in use, choose another port when prompted or manually kill the process:

bash

npx kill-port 8081
Image Not Found Errors
Ensure all images are present in the assets/ folder and that the paths in the code match the file structure.

Contributing
Fork the repository.
Create a feature branch:
bash

git checkout -b feature-name
Commit your changes:
bash

git commit -m "Add your message here"
Push to your branch:
bash

git push origin feature-name
Create a Pull Request.
