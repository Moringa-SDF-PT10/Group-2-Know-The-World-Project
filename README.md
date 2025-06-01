
# 🌍 Know The World

Know The World is a modern web application designed to help users explore countries around the globe, access detailed country information, and plan their travel. It includes user authentication features to provide a personalized experience.

---

## 🚀 Features

- 🌐 Browse and search countries worldwide
- 🔍 View detailed information about each country
- ✅ User Registration & Login system (with UUID-based user IDs)
- 🛡️ Protected Routes for authenticated users
- 🗺️ Modern and responsive design
- 💬 Friendly error messages and input validation
- 📦 Organized component structure for scalability

---

## 🛠️ Tech Stack

| Category        | Technologies Used                        |
|----------------|-------------------------------------------|
| **Frontend**    | React, Vite, JSX, HTML5, CSS3             |
| **State Mgmt**  | React useState, useEffect                |
| **Auth**        | Custom UUID-based logic (non-Firebase)   |
| **Styling**     | Custom CSS, Responsive Design            |
| **Tooling**     | Git, GitHub, React DevTools              |

---

## 📂 Project Structure

Know-The-World/
│
├── public/ # Static assets
├── src/
│ ├── components/ # React components (Register, Login, etc.)
│ ├── pages/ # Page-level components
│ ├── App.jsx # Main App logic
│ └── main.jsx # React DOM rendering
├── .gitignore
├── index.html
├── package.json
└── README.md

yaml
Copy
Edit

---

## 💻 Installation & Setup

1. **Clone the repository**

```bash
git clone git@github.com:Moringa-SDF-PT10/Group-2-Know-The-World-Project.git
cd Group-2-know-The-World-Project
Install dependencies

bash
Copy
Edit
npm install
Run the development server

bash
Copy
Edit
npm run dev
Open in Browser

Visit: http://localhost:5173

🧪 Usage Guide
To Register: Enter your name, email, and password → Click "Register"

To Login: Use your registered email/password → Access protected content

If login fails, you will be prompted to register

Password fields include suggestions (e.g. autocomplete disabled for privacy)

🤝 Contributing
We welcome contributions from the team or others!
To contribute:

Fork the repo

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Added new feature"

Push to your branch: git push origin feature-name

Open a Pull Request (PR)



📜 License
This project is open-source and available under the MIT License.

📌 Acknowledgments
React documentation: https://react.dev

Vite documentation: https://vitejs.dev

UUID Package: uuid

## authors
Eric
Edith
Stephen
Fatuma