# WTWR (What to Wear React App)

## Project Description

WTWR (What to Wear) is a responsive React application that recommends clothing items based on current weather conditions. The app dynamically displays clothing options depending on temperature and allows users to view, add, and manage items in their personal collection.

This project was built as part of the TripleTen Software Engineering program and focuses on React fundamentals, component structure, state management, and API interaction.

---

## Features

- Displays current temperature and weather conditions
- Filters clothing items based on weather (hot, warm, cold)
- Add new clothing items through a form
- Delete items from your collection
- Preview items in a modal
- Toggle between Fahrenheit and Celsius
- Responsive layout following Figma design

---

## Technologies Used

- React (Vite)
- JavaScript (ES6+)
- CSS (BEM methodology)
- HTML5
- Git & GitHub
- JSON Server (for local API simulation)

---

## Project Structure

```plaintext
src/
├── blocks/            # CSS files (BEM structure)
├── components/        # React components
├── contexts/          # React Context (temperature unit)
├── hooks/             # Custom hooks
├── utils/             # API and helper functions
```

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/se_project_react.git
```

2. Navigate into the project:

```bash
cd se_project_react
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

---

## API

This project uses a local JSON server to simulate backend functionality for clothing items and user data.

To run the server:

```bash
npx json-server --watch db.json --port 3001
```

---

## Future Improvements

- Connect to a real weather API
- Add user authentication
- Improve mobile responsiveness
- Deploy to production

---

## Author

Andrew Norris

---

## License

This project is for educational purposes.

The backend for this project can be found at: https://github.com/ANORRIS56/se_project_express
