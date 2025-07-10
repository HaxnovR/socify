# Socify

<img src="https://user-images.githubusercontent.com/60336295/174442559-bf0a3d70-8467-4b66-9b76-5cc3f13415d3.png" align="right" width="180px"/>

---

Socify is a platform that enables users to host and join remote listening parties. Whether exploring new music or enjoying favorite tracks together, users can create synchronized public or private listening rooms to enhance social engagement through shared audio experiences.

## Features

- Real-time synchronized music playback across users
- Create private or public listening rooms
- In-room chat for social interaction
- Join trending public sessions to discover new music
- Responsive and user-friendly interface

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Real-time: Socket.IO
- Deployment: Heroku
- Fonts: Custom fonts included in assets
- Version Control: Git with submodules

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HaxnovR/socify.git
cd socify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm start
```

### 4. Start the backend server

Navigate to the server directory:

```bash
cd server
node index.js
```

Ensure that the frontend and backend are running on separate ports.

## Project Structure

```
socify/
├── public/             # Static files and HTML templates
├── src/                # React components and app logic
├── server/             # Node.js backend using Express
├── assets/             # Fonts and design assets
├── build/              # Production-ready frontend build
├── old(ignore)/        # Deprecated or legacy files
├── Procfile            # Heroku deployment configuration
├── .gitmodules         # External Git submodules
└── package.json        # Project metadata and scripts
```

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature-name"`
4. Push to your branch and open a pull request

## License

This project is licensed under the MIT License.
