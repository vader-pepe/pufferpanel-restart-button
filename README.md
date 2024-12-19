# Pufferpanel Restart Button

This project is a simple TypeScript-based web server that provides a simple button for restaring a server via API calls. The server uses environment variables for sensitive data and is containerized using a multi-stage Docker build.

## Features

- Written in TypeScript.
- Uses `pnpm` for dependency management.
- Environment variable support for sensitive data (e.g., username and password).
- Dockerized with a lightweight production image.

---

## Requirements

- Node.js (v18 or later)
- pnpm (v8 or later)
- Docker (for containerization)
- `.env` file with the following variables:

```env
USERNAME=your_email@example.com
PASSWORD=your_password
SERVER=your_server_id
HOST=your_pufferpanel_webui
PORT=your_pufferpanel_webui_port
```
your server id can be obtained in your pufferpanel web UI
![image](https://github.com/user-attachments/assets/23a54055-c87d-4da7-95e8-c5cc048fc3cc)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vader-pepe/pufferpanel-restart-button.git
   cd pufferpanel-restart-button
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory:
     ```bash
     echo "USERNAME=your_email@example.com" >> .env
     echo "PASSWORD=your_password" >> .env
     echo "SERVER=your_server_id" >> .env
     echo "HOST=your_pufferpanel_webui" >> .env
     echo "PORT=your_pufferpanel_webui_port" >> .env
     ```

4. **Run Locally**:
   ```bash
   pnpm start
   ```
   The server will start at `http://localhost:3000`.

---

## Docker Usage

### Build and Run the Docker Image

1. **Build the Image**:
   ```bash
   docker build -t my-image .
   ```

2. **Run the Container**:
   ```bash
   docker run -d -p 3000:3000 --env-file .env --name my-container my-image
   ```

3. Access the application at `http://localhost:3000`.

### Debugging Build Issues

To debug any issues during the Docker build process, use the following commands:
```bash
docker builder prune --all
docker build -t my-image .
```

---

## File Structure

```plaintext
.
├── Dockerfile        # Multi-stage Dockerfile
├── README.md         # Project documentation
├── package.json      # Project metadata and scripts
├── pnpm-lock.yaml    # pnpm lock file
├── src/              # Source code directory
│   └── server.ts     # Main server logic
├── tsconfig.json     # TypeScript configuration
└── .env              # Environment variables (not included in version control)
```
---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

