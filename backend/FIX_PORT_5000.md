# Fix for Port 5000 Issue on macOS

## Problem
macOS AirPlay Receiver uses port 5000 by default, which can conflict with your backend server.

## Solution
The backend is now configured to use port **5001** instead of 5000.

## Updated Configuration

### Backend (.env)
```
PORT=5001
```

### Frontend (vite.config.js)
The proxy now points to `http://localhost:5001`

## Alternative: Disable AirPlay Receiver (Optional)

If you prefer to use port 5000:

1. Go to **System Settings** → **General** → **AirDrop & Handoff**
2. Turn off **AirPlay Receiver**

Or via Terminal:
```bash
# Disable AirPlay Receiver
sudo defaults write com.apple.controlcenter.plist AirplayRecieverEnabled -bool false

# Enable AirPlay Receiver (if needed later)
sudo defaults write com.apple.controlcenter.plist AirplayRecieverEnabled -bool true
```

Then restart your Mac for changes to take effect.

## Restart Required
After changing the port, restart both backend and frontend servers.

