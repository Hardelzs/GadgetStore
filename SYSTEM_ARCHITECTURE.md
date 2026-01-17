# GadgetStore - System Architecture

## Project Overview
GadgetStore is a web-based Device Registration and Management System for an educational institution (Dominion University). It allows students to register gadgets/devices and administrators to manage device inventory with real-time data visualization.

---

## Technology Stack

### Frontend
- **Framework**: React 19.1.0 (with React Router DOM 7.6.0)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1.5 + Tailwind Merge
- **Component UI**: Radix UI, Material-UI (MUI)
- **Icons**: React Icons 5.5.0
- **Charts**: Chart.js 4.4.9 + React-ChartJS-2 5.3.0
- **Animation**: Framer Motion 12.12.1, Anime.js 4.0.2
- **Data Export**: React-CSV 2.2.2

### Backend/Database
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **File Hosting**: Vercel Blob

### Deployment
- **Hosting**: Vercel

---

## Directory Structure

```
GadgetStore/
├── src/
│   ├── Pages/
│   │   ├── Login.jsx                 # Authentication entry point
│   │   ├── Dashboard.jsx             # Admin dashboard with statistics
│   │   ├── Registerdevice.jsx        # Device registration form
│   │   ├── Mydevice.jsx              # Device management/listing
│   │   ├── ForgotPassword.jsx        # Password reset
│   │   └── Adminpanel.jsx            # Admin controls
│   │
│   ├── Components/
│   │   ├── Sidebar.jsx               # Navigation sidebar
│   │   ├── Topbar.jsx                # Header/topbar
│   │   ├── Chart.jsx                 # Dashboard charts
│   │   ├── InternetStatus.jsx        # Connectivity indicator
│   │   ├── DigitalClock.jsx          # Clock display
│   │   ├── Notification.jsx          # Toast notifications
│   │   ├── ProtectedRoute.jsx        # Route protection wrapper
│   │   ├── TimeOut.jsx               # Session timeout handler
│   │   ├── Setting.jsx               # Settings panel
│   │   ├── ui/
│   │   │   ├── button.jsx            # Reusable button component
│   │   │   ├── alert-dialog.jsx      # Confirmation dialogs
│   │   │   └── checkbox.jsx          # Checkbox component
│   │   └── [Other Components]
│   │
│   ├── lib/
│   │   ├── firebase.js               # Firebase configuration & utilities
│   │   └── utils.js                  # Helper functions (cn, clsx, tailwind-merge)
│   │
│   ├── utils/
│   │   └── deviceservice.js          # Device CRUD operations
│   │
│   ├── data/
│   │   └── deviceData.json           # Device catalog (types, brands, models)
│   │
│   ├── App.jsx                       # Main app with routing
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
│
├── public/
│   ├── _redirects                    # Vercel redirects
│   └── Screenshots/                  # Marketing images
│
├── package.json                      # Dependencies
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
├── eslint.config.js                  # ESLint rules
└── vercel.json                       # Vercel deployment config
```

---

## Core Pages & Functionality

### 1. **Login Page** (`Login.jsx`)
- **Purpose**: User authentication
- **Features**:
  - Student ID validation (hardcoded: "Dominion")
  - Password authentication (stored in localStorage)
  - Forgot Password link
  - Show/hide password toggle
  - Decorative animations (WaterDrop, DivOrigami)
- **Route**: `/`

### 2. **Dashboard** (`Dashboard.jsx`)
- **Purpose**: Admin statistics and overview
- **Features**:
  - Display key metrics in card format:
    - Total Students (unique matric numbers)
    - Total Gadgets (device count)
    - Alpha Semester devices
    - Omega Semester devices
  - Real-time data from Firestore
  - Chart visualization
  - Project listing
- **Route**: `/dashboard`

### 3. **Register Device** (`Registerdevice.jsx`)
- **Purpose**: Student device registration
- **Features**:
  - Multi-device registration in single submission
  - Student info capture:
    - Hall residence (auto-assigns gender)
    - Semester selection
    - Matric number (auto-formats with "DU" prefix)
    - Registration date
  - Device details per gadget:
    - Type (from deviceData.json catalog)
    - Brand (filtered based on type)
    - Model name (filtered based on brand)
    - Serial number
    - MAC/IMEI
    - Image upload (converted to Base64)
  - Dynamic device count adjustment
  - Base64 image encoding for storage
- **Route**: `/Registerdevice`

### 4. **My Devices** (`Mydevice.jsx`)
- **Purpose**: Student/admin device management
- **Features**:
  - List all registered devices
  - Search by device name/serial
  - Filter by:
    - Semester
    - Date range (day, month, year)
    - Hall residence
    - Gender
  - Edit device details
  - Delete devices with confirmation dialog
  - Download CSV export
  - Animation for deleted items
  - Real-time device count stats
- **Route**: `/Mydevice`

### 5. **Forgot Password** (`ForgotPassword.jsx`)
- **Purpose**: Password reset functionality
- **Features**:
  - Set new password
  - Saves to localStorage
  - Redirect to login
- **Route**: `/password`

---

## Data Models

### Device Document (Firestore: `devices` collection)
```javascript
{
  id: String,                    // Auto-generated
  type: String,                  // e.g., "Phone", "Laptop", "Tab", "Smartwatch"
  brand: String,                 // e.g., "Apple", "Samsung"
  name: String,                  // Device model
  serial: String,                // Serial number
  mac: String,                   // MAC address or IMEI
  image: String,                 // Base64 encoded image
  matric: String,                // Student matric (DU-prefixed)
  hallresidence: String,         // e.g., "Faith Hall", "New Hall"
  semester: String,              // "Alpha Semester" or "Omega Semester"
  gender: String,                // "Male" or "Female" (auto-assigned)
  date: String,                  // Registration date (YYYY-MM-DD)
  timestamp: Firebase.Timestamp  // Server-side timestamp
}
```

### Device Catalog (JSON: `deviceData.json`)
```javascript
[
  {
    DeviceBrand: String,         // e.g., "Apple", "Samsung"
    DeviceName: String,          // e.g., "iPad Air (1st Gen)"
    DeviceType: String           // e.g., "Tab", "Phone", "Laptop"
  }
  // ... 2800+ device entries
]
```

---

## Authentication & Security

### Current Implementation
- **Method**: Simple credential check in localStorage
- **Credentials**: 
  - ID: `"Dominion"`
  - Password: Default `"dudevice01"` (stored in localStorage)
- **Protected Routes**: ProtectedRoute component (currently commented out)

### Flow
```
Login Page → Validate ID & Password → Dashboard
              ↓ (invalid)
           Alert Error
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
├─────────────────────────────────────────────────────────┤
│  Login → Dashboard → Register Device → My Devices       │
│           ↓              ↓                  ↓            │
│        Statistics    Form Submit         CRUD Ops        │
└─────────────────────────────────────────────────────────┘
                           ↓
                    ┌──────────────┐
                    │ React Router │
                    │ State Mgmt   │
                    └──────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  SERVICE LAYER                           │
├─────────────────────────────────────────────────────────┤
│  deviceService.js → Device CRUD                         │
│  firebase.js      → Firestore Operations                │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    FIREBASE                             │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Firestore   │  │  Storage     │  │  Auth        │  │
│  │  (devices)   │  │  (images)    │  │  (planned)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Key Firebase Functions

### Available in `firebase.js`
1. **fetchDevices()** - Retrieve all devices with optional query constraints
2. **fetchDevice()** - Get single device by ID
3. **deleteDevice()** - Remove device from Firestore
4. **updateDevice()** - Modify existing device
5. **saveDevice()** - Add new device (in deviceService.js)

---

## Component Hierarchy

```
App.jsx (Router)
├── Login
├── Dashboard
│   ├── Sidebar
│   ├── Topbar
│   ├── Chart
│   ├── projects
│   └── InternetStatus
├── Registerdevice
│   ├── Sidebar
│   ├── Topbar
│   ├── Form inputs
│   └── InternetStatus
├── Mydevice
│   ├── Sidebar
│   ├── Topbar
│   ├── Search/Filter controls
│   ├── Device Cards/Table
│   ├── AlertDialog (delete confirmation)
│   ├── InternetStatus
│   └── TimeOut
└── ForgotPassword
```

---

## Features Summary

### Admin/Dashboard Features
- Real-time device statistics
- Student count aggregation
- Semester-wise distribution
- Chart visualization
- Device data export (CSV)
- Download functionality

### Student/Registration Features
- Multi-device registration
- Auto-gender assignment (based on hall)
- Device catalog (2800+ devices)
- Dynamic brand/model filtering
- Image upload with Base64 encoding
- Form validation

### Device Management Features
- Search devices by name/serial
- Multi-criteria filtering
- Edit device details
- Soft delete with animation
- Date range filtering
- Gender/hall-based filtering
- CSV export

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Sidebar navigation
- Decorative animations
- Internet connectivity indicator
- Session timeout detection
- Toast notifications
- Dark/light theme support (Tailwind)

---

## Performance Considerations

1. **Device Data Catalog**: 2800+ static entries loaded at build time
2. **Firestore Queries**: No pagination implemented (consider for large datasets)
3. **Image Storage**: Base64 encoding (consider Firebase Storage for large files)
4. **Real-time Updates**: No real-time listeners currently implemented

---

## Future Enhancement Recommendations

1. **Authentication**: Replace localStorage with Firebase Auth
2. **Authorization**: Implement role-based access control (RBAC)
3. **Pagination**: Add pagination for device listings
4. **Real-time Sync**: Add Firestore real-time listeners
5. **Image Optimization**: Use Firebase Storage instead of Base64
6. **API Layer**: Create backend API for better data handling
7. **Error Handling**: Implement centralized error boundary
8. **Analytics**: Add usage tracking and reporting
9. **Notifications**: Implement email/SMS notifications
10. **Offline Support**: Add PWA capabilities for offline functionality

---

## Configuration Files

- **vite.config.js**: Build configuration
- **tailwind.config.js**: Tailwind CSS customization
- **jsconfig.json**: JavaScript path aliases (@/Components, @/Pages, etc.)
- **eslint.config.js**: Code linting rules
- **vercel.json**: Deployment settings
- **components.json**: UI component configuration

---

## Deployment Pipeline

```
Local Development (npm run dev)
        ↓
    Build (npm run build)
        ↓
    Lint Check (npm run lint)
        ↓
    Vercel Deployment
        ↓
    Production (vercel.json redirects)
```

---

## Contact & Attribution
- **Organization**: NACOS DU (Dominion University)
- **Developers**: Hardelz • LightArts
- **Environment**: Dominion University Device Registration System
