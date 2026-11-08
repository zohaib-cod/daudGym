# daudGym - FG & S.M Fitness Gym (Frontend)

Modern, executive luxury gym admission desk & administration portal built with Next.js App Router, Tailwind CSS, and Lucide Icons.

### Owners & Directors
- **Saqib Mehmood**
- **Ali Daud**

---

## ✨ Features

- **Executive Gym Membership Admission Desk**:
  - Full Name, Father Name, Contact Number, CNIC / ID Card, Picture, Residential Address.
  - Live photo upload preview with instant camera/file picker.
  - Direct integration with Cloudinary & Express REST backend.
  - Immediate generation of Official Printable Membership Pass.

- **Dedicated Admin Console (`/admin`)**:
  - Live KPI Stat Cards (Total Members, Active Passes, Inactive, New This Month).
  - Instant search across Name, Father Name, CNIC, Phone, Address, and ID.
  - Filter pills (All, Active, Inactive).
  - One-click Status Toggle (`Active` <-> `Inactive`).
  - Printable official gym card modal with `@media print` support.
  - Export all members to CSV.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Set your backend API URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
*(In production, replace with your deployed backend URL, e.g., `https://your-backend.onrender.com/api`)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for Registration Desk, or [http://localhost:3000/admin](http://localhost:3000/admin) for Admin Console.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.js          # Root HTML layout and metadata
│   ├── page.js            # Main Admission Desk page
│   ├── admin/page.js      # Dedicated Admin Panel page
│   └── globals.css        # Tailwind directives and styling
├── components/
│   ├── Navbar.jsx         # Executive branding header with owners
│   ├── RegistrationForm.jsx # Membership application form
│   ├── AdminPanel.jsx     # Management console, KPIs, search & table
│   └── MembershipCard.jsx # Printable member pass modal
├── lib/
│   └── api.js             # Client API integration helper
├── public/                # Static assets & gym badges
├── tailwind.config.js     # Luxury athletic dark theme configuration
└── postcss.config.js      # PostCSS configuration
```
