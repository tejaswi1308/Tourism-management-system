# Running Tourist Management System on Windows PowerShell

## Step-by-Step Instructions for Windows

### Step 1: Open PowerShell

1. Press `Windows Key + X` and select "Windows PowerShell" or "Terminal"
2. Or search for "PowerShell" in the Start menu
3. Or right-click in the project folder and select "Open in Terminal"

### Step 2: Navigate to Project Directory

```powershell
cd "C:\Users\Akhil kumar\Downloads\tourism"
```

**Note:** If you're already in the Downloads folder, you can use:
```powershell
cd tourism
```

### Step 3: Install Dependencies (First Time Only)

```powershell
npm install
```

This will install all required packages. Wait for it to complete (may take 2-5 minutes).

### Step 4: Start JSON Server (Backend)

You need to run the JSON Server in a separate terminal window. Here are two options:

#### Option A: Open a New PowerShell Window
1. Right-click on the PowerShell icon in the taskbar
2. Select "Windows PowerShell" to open a new window
3. Navigate to the project directory:
   ```powershell
   cd "C:\Users\Akhil kumar\Downloads\tourism"
   ```
4. Start the JSON Server:
   ```powershell
   npm run server
   ```
5. You should see: `\{^_^}/ hi!` and `Loading db.json` - Keep this window open!

#### Option B: Use PowerShell Tabs (Windows Terminal)
If you're using Windows Terminal:
1. Click the "+" icon to open a new tab
2. Navigate to the project directory
3. Run `npm run server`

### Step 5: Start React Development Server

In your **original PowerShell window** (or a new tab), make sure you're in the project directory and run:

```powershell
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 6: Open the Application

1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Navigate to: `http://localhost:5173`
3. You should see the Tourist Management System homepage!

## Quick Reference Commands

### In PowerShell Terminal 1 (JSON Server):
```powershell
cd "C:\Users\Akhil kumar\Downloads\tourism"
npm run server
```

### In PowerShell Terminal 2 (React App):
```powershell
cd "C:\Users\Akhil kumar\Downloads\tourism"
npm run dev
```

## Troubleshooting

### Issue: "npm is not recognized"
**Solution:** Node.js is not installed or not in PATH
1. Download Node.js from https://nodejs.org/
2. Install it and restart PowerShell
3. Verify installation: `node --version` and `npm --version`

### Issue: "Port 3000 is already in use"
**Solution:** Another application is using port 3000
1. Find and close the application using port 3000, OR
2. Change the port in `package.json`:
   ```json
   "server": "json-server --watch db.json --port 3001"
   ```
3. Update `src/services/api.js` to use port 3001

### Issue: "Port 5173 is already in use"
**Solution:** Another Vite app is running
1. Close the other Vite application, OR
2. Vite will automatically use the next available port (5174, 5175, etc.)

### Issue: "Cannot find module"
**Solution:** Dependencies not installed
```powershell
npm install
```

### Issue: "Access Denied" or Permission Errors
**Solution:** Run PowerShell as Administrator
1. Right-click PowerShell icon
2. Select "Run as Administrator"
3. Navigate to project and run commands

### Issue: JSON Server shows "Cannot GET /"
**Solution:** This is normal! JSON Server is running correctly. The API endpoints are:
- http://localhost:3000/destinations
- http://localhost:3000/packages
- etc.

## Stopping the Servers

To stop either server:
1. Click in the PowerShell window where it's running
2. Press `Ctrl + C`
3. Confirm with `Y` if prompted

## Windows-Specific Tips

1. **Copy-Paste in PowerShell:**
   - Right-click to paste (or `Ctrl + V` in newer PowerShell versions)
   - `Ctrl + C` to copy

2. **Clear Screen:**
   ```powershell
   Clear-Host
   ```
   or simply: `cls`

3. **Check if Ports are in Use:**
   ```powershell
   netstat -ano | findstr :3000
   netstat -ano | findstr :5173
   ```

4. **Kill Process on Port (if needed):**
   ```powershell
   # Find process ID (PID) from netstat command above, then:
   taskkill /PID <process_id> /F
   ```

## Visual Guide

```
┌─────────────────────────────────────┐
│  PowerShell Window 1               │
│  (JSON Server)                      │
│  ────────────────────────────────   │
│  C:\...\tourism> npm run server     │
│  \{^_^}/ hi!                        │
│  Loading db.json                    │
│  Resources                           │
│  http://localhost:3000/destinations  │
│  ...                                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  PowerShell Window 2               │
│  (React App)                        │
│  ────────────────────────────────   │
│  C:\...\tourism> npm run dev       │
│  VITE v5.0.8 ready                 │
│  ➜ Local: http://localhost:5173/   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Web Browser                        │
│  http://localhost:5173              │
│  ────────────────────────────────   │
│  [Tourist Management System UI]     │
└─────────────────────────────────────┘
```

## Need Help?

If you encounter any issues:
1. Check that both servers are running
2. Verify you're in the correct directory
3. Make sure Node.js and npm are installed correctly
4. Check the browser console (F12) for errors
5. Review the main README.md for more details


