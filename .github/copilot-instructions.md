# YarrowTech Copilot Instructions

## Architecture Overview
- **Full-stack MERN app**: React (Vite) frontend, Node.js/Express backend, MongoDB database
- **Dual system**: Public landing website + internal ERP system
- **ERP roles**: admin (full access), manager, techlead, client (limited)
- **Real-time features**: Socket.io for messaging between roles
- **File handling**: Cloudinary for uploads, PDFKit for invoice generation

## Key Patterns
- **Backend structure**: `erp/` folder for ERP modules (controllers, models, routes, middleware)
- **Authentication**: JWT tokens stored in localStorage, auto-attached via Axios interceptors
- **Role-based access**: `verifyRoles` middleware with admin override
- **API endpoints**: `/api/` for public routes, `/api/erp/` for ERP (e.g., `/api/erp/manager/projects`)
- **Models**: Mongoose schemas with `pre('save')` hooks for password hashing, `matchPassword` methods
- **Frontend services**: Centralized API calls in `services/` using shared `axiosInstance`

## Development Workflows
- **Backend**: `npm run server` (nodemon) on port 5000
- **Frontend**: `npm run dev` (Vite) on port 5173
- **Environment**: Use `.env` for `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `PORT=5000`
- **Database**: Single MongoDB connection; models prefixed (e.g., `ERPUser`, `ERPClient`)
- **Real-time**: Socket.io server on same port; clients emit `register` with email, `send-message` objects

## Code Conventions
- **File naming**: Controllers/routes camelCase (e.g., `erpAuth.controller.js`), models PascalCase (e.g., `User.js`)
- **Imports**: ES modules (`import/export`)
- **Error handling**: Try/catch in controllers, `toast.error` in React components
- **State management**: Local state in React; no global state library
- **Styling**: CSS modules or className-based; Framer Motion for animations

## Examples
- **Create ERP route**: `router.post('/login', erpLogin);` in `erp/routes/erpAuth.routes.js`
- **Protected API call**: `API.get('/erp/manager/projects')` in `services/managerService.js`
- **Role check**: `verifyRoles('manager', 'admin')` before route handlers
- **Socket message**: `socket.emit('send-message', { toEmail, message })` in components

Follow these patterns for consistent, secure ERP functionality.</content>
<parameter name="filePath">d:\Yarrowtech\.github\copilot-instructions.md