# 📱 GadgetStore

A simple gadget registration system built using **React + Vite + TailwindCSS**. This project allows users to register gadgets, update or delete gadget details, and export gadget data in CSV format. Gadget data is persisted locally in the browser using `localStorage`.

---

## 📸 Project Preview

> _You can add your screenshots below. Upload the images to your repo and update the image paths accordingly._

| Dashboard Page | Register Gadget Page |
|----------------|----------------------|
| ![Dashboard Screenshot](./screenshots/dashboard.png) | ![Register Page Screenshot](./screenshots/register.png) |

---

## 📚 Features

- ✅ Register a gadget with brand, model, date, condition, etc.
- 📝 Edit and update gadget details
- ❌ Delete gadget records
- 💾 Data stored using `localStorage` (no backend required)
- 📥 Export all gadgets to CSV format
- 🎨 Beautiful UI with TailwindCSS
- 🧭 Smooth navigation with React Router DOM

---

## 📂 Folder Structure
GadgetStore/
├── public/
├── src/
│ ├── components/
│ │ ├── GadgetForm.jsx
│ │ ├── GadgetList.jsx
│ │ ├── Navbar.jsx
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Register.jsx
│ │ ├── Edit.jsx
│ ├── utils/
│ │ └── exportToCSV.js
│ ├── App.jsx
│ ├── main.jsx
├── README.md
├── package.json


---

## 🚀 How to Run the Project Locally

### Step 1: Clone the Repository
```bash
git clone https://github.com/Hardelzs/GadgetStore.git
cd GadgetStore

### Step 2: Insatll dependencies
```bash
npm install

### Step 3: Start the Development Server
``` bash
npm run dev


### 🧩 Stack

React

Vite

TailwindCSS

React Router DOM

JavaScript

localStorage

CSV Export


✏️ How to Use
Register Gadget: Go to the Register page, fill in the gadget details, and save.

View All Gadgets: Head over to the Dashboard to view registered gadgets.

Edit Gadget: Click the "Edit" button on any gadget to update its info.

Delete Gadget: Use the delete button to remove a gadget entry.

Export to CSV: Click the "Export to CSV" button to download your data.