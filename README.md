# daudGym - FG & S.M Fitness Gym (Frontend)

Modern, executive luxury gym admission desk & secret administration portal built with Next.js App Router, Tailwind CSS, and Lucide Icons.

### Owners & Directors
- **Saqib Mehmood**
- **Ali Daud**

---

## 🔒 Secret Admin Portal

The public user interface is strictly restricted to the **Gym Admission Desk** (`/`). Standard gym visitors and applicants have no visibility or access to admin features.

The **Admin Console** is located on a dedicated, protected secret route:
- **Secret Route:** `/secret-admin` (or `/admin`)
- **Default Username:** `admin` (or `saqib_ali`)
- **Default Password:** `fgsm@gym2026`

---

## 🌐 Live Backend API
Connected to deployed Vercel backend:
```env
NEXT_PUBLIC_API_URL=https://daud-gym-b.vercel.app/api
```

---

## ✨ Features

- **Public Admission Desk (`/`)**:
  - Full Name, Father Name, Contact Number, CNIC / ID Card, Picture, Residential Address.
  - Live photo upload preview with instant camera/file picker.
  - Direct integration with Cloudinary & Express REST backend.
  - Immediate generation of Official Printable Membership Pass.

- **Protected Secret Admin Console (`/secret-admin`)**:
  - Secure Login Portal with encrypted session persistence.
  - Live KPI Stat Cards (Total Members, Active Passes, Inactive, New This Month).
  - Instant search across Name, Father Name, CNIC, Phone, Address, and ID.
  - Filter pills (All, Active, Inactive).
  - One-click Status Toggle (`Active` <-> `Inactive`).
  - Printable official gym card modal with `@media print` support.
  - Export all members to CSV.
  - One-click Logout and navigation to Admission Desk.

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

### 3. Run Development Server
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) for Public Admission Desk.
- Open [http://localhost:3000/secret-admin](http://localhost:3000/secret-admin) for Secret Admin Portal.

### 4. Build for Production
```bash
npm run build
npm start
```
