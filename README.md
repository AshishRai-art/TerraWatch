# TerraWatch 🌍⛏️

**Smart Mine Monitoring and Environmental Safety System**

TerraWatch is an Electron-based desktop application prototype designed to support mine monitoring through sensor data, monitoring-node models, analytical tools, and AI-assisted insights. The project aims to provide a structured foundation for visualizing monitoring information and supporting safer, more informed mining operations.

## 🚀 Features

- **Mine Monitoring:** Organize monitoring-node data and related information.
- **Sensor Services:** Provide a dedicated service layer for sensor-related operations.
- **Data Analysis:** Integrate analytical functionality through the project's analysis module.
- **AI Assistant Integration:** Support assistant-related functionality through a separate service.
- **Desktop Application:** Built with Electron for a desktop user experience.
- **MVC-Inspired Architecture:** Separate models, controllers, services, and configuration.
- **Modular Design:** Keep application responsibilities organized for easier maintenance and future development.
- **Testing:** Include automated tests for monitoring-model functionality.

> **Note:** TerraWatch is a research prototype. Actual hardware integration, real-time monitoring, and production safety capabilities depend on the implementation and validation of the relevant components.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Electron | Desktop application framework |
| JavaScript (ES modules) | Application logic |
| HTML5 | User interface structure |
| CSS3 | Styling and responsive presentation |
| Node.js | JavaScript runtime |
| dotenv | Environment configuration |
| Node.js Test Runner | Automated testing |
| Git and GitHub | Version control and collaboration |

## 📁 Project Structure

```text
TerraWatch/
├── api/
│   └── analyze.js
├── src/
│   ├── config/
│   │   └── app-config.mjs
│   ├── controllers/
│   │   └── monitoring-controller.mjs
│   ├── models/
│   │   ├── monitoring-node.mjs
│   │   └── prototype-data.mjs
│   └── services/
│       ├── assistant-service.mjs
│       └── sensor-service.mjs
├── tests/
│   └── monitoring-model.test.mjs
├── index.html
├── app.js
├── main.js
├── preload.js
├── styles.css
├── theme.css
├── redesign.css
├── auth.css
├── demo-auth.css
├── seismometer.css
├── package.json
├── .env.example
├── ARCHITECTURE.md
└── README.md
```

### Architecture Overview

TerraWatch follows an MVC-inspired structure with additional service and configuration layers.

- **Models (`src/models/`):** Represent monitoring nodes and prototype data.
- **Views (`index.html`, `app.js`, CSS files):** Present the application's interface and user interactions.
- **Controllers (`src/controllers/`):** Coordinate monitoring-related application logic.
- **Services (`src/services/`):** Separate sensor operations and assistant-related functionality.
- **Configuration (`src/config/`):** Centralize application configuration.
- **Analysis (`api/`):** Organize analysis-related functionality.
- **Electron Main Process (`main.js`):** Manages desktop application lifecycle and windows.
- **Preload (`preload.js`):** Provides the renderer with a controlled bridge to privileged Electron functionality.
- **Tests (`tests/`):** Verify supported application behavior.

## 💻 Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- Git

### 1. Clone the repository

```bash
git clone https://github.com/AshishRai-art/TerraWatch.git
cd TerraWatch
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Review `.env.example` for the configuration variables required by the application.

If the application requires environment variables, create a local `.env` file and fill in the appropriate values:

```bash
cp .env.example .env
```

Use your own valid credentials where required. Never commit `.env` files containing secrets to GitHub.

### 4. Start TerraWatch

```bash
npm start
```

This runs the Electron application using the start script defined in `package.json`.

## 🧪 Testing and Validation

Run the automated tests:

```bash
npm test
```

Check JavaScript syntax:

```bash
npm run check
```

Run both checks before submitting changes or merging a pull request.

## 🔐 Security Considerations

- Never commit API keys, passwords, tokens, or private credentials.
- Keep sensitive configuration in environment variables.
- Review Electron security settings and preload API exposure.
- Validate incoming data before processing it.
- Do not treat prototype monitoring outputs as certified safety measurements.

## 🗺️ Roadmap

Potential future improvements include:

- Real-time sensor data ingestion and monitoring.
- Interactive monitoring dashboards and historical trends.
- Configurable alerts for abnormal sensor readings.
- Mine-site maps and monitoring-node visualization.
- Improved analysis and reporting tools.
- Expanded automated tests and error handling.
- Integration with validated hardware and data sources.
- Deployment and security hardening for production environments.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and add tests where appropriate.
4. Run `npm test` and `npm run check`.
5. Submit a pull request describing your changes.

## ⚠️ Disclaimer

TerraWatch is a research and development prototype. It is not a certified mine-safety system and must not be used as the sole basis for operational safety decisions. Real-world deployment requires validated sensors, reliable data pipelines, domain-expert review, and appropriate safety certification.

## 👨‍💻 Author

**Ashish Rai**

GitHub: [@AshishRai-art](https://github.com/AshishRai-art)

## 📄 License

No license has been specified yet. Add an appropriate `LICENSE` file before distributing the project under an open-source license.

---

**TerraWatch — Building a smarter foundation for mine monitoring and environmental awareness.**
