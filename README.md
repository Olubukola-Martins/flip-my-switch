Here’s a **quick README** for your chic-themed fintech app, **Flip The Switch 💡**, summarizing the technologies used, features, and setup instructions:

---

# 💡 Flip The Switch – Fintech App

A beautifully styled, swipeable fintech app built with React Native and Expo, designed to showcase elegant UI, smooth animations, and biometric login.

---

## ✨ Features


- **User login** with name, username, and password
- **Returning users greeted by name**
- **Swipeable dashboard** showing current and savings accounts
- **Animated menu drawer**
- **Biometric login** (Face ID / Touch ID)
- **Mocked backend** using REST API
- **Cross-platform**: Android & iOS

---

## 🛠️ Technologies Used

- **React Native** (Expo)
- **TypeScript**
- **Redux Toolkit** for state management
- **NativeWind + TailwindCSS** for styling
- **React Native Reanimated** for animations
- **Expo Linear Gradient** for backgrounds
- **Lottie React Native** for animations
- **Expo Local Authentication** for biometrics
- **MockAPI.io** for backend simulation

---

## 📦 Installation & Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Olubukola-Martins/flip-my-switch.git
   cd flip-the-switch
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start the app**  
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**  
   - Android: `npx expo start --android`  
   - iOS: `npx expo start --ios`

---

## 🔐 Mocked Backend

- Uses MockAPI.io to simulate:
  - User login
  - Account data (current & savings)
- API endpoint: `https://688f6662f21ab1769f890f6f.mockapi.io/switch/signin`

---

## 🧪 Optional Features

- **Biometric login** using fingerprint or Face ID
- **Animated transitions** and Lottie visuals
- **Responsive design** with elegant gradients and blur effects

---

## 📄 Folder Structure

```
/assets
  /animations
/app
  /screens
/store
  userSlice.ts
  store.ts
utility
  helperFn.ts
```

---

Would you like me to generate a `README.md` file for download or help you publish this to GitHub or Expo?
