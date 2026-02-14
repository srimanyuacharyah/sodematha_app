# Sode Matha Seva Platform

Seva Platform is a modern, scalable, full-stack application designed to serve web users and backend services through a secure and modular architecture.

## High-Level Architecture

Both Web and Mobile clients communicate with the backend APIs.

```text
Web UI (Next.js) ───> Backend APIs (Spring Boot) ───> Database (H2/MySQL)
```

## Getting Started

### Prerequisites
- **Java 17**: Required for the backend platform.
- **Node.js 18+**: Required for the web UI.
- **Maven**: For building the Java backend (included in `seva_platform` for this device).

---

### 1. Run the Backend (Seva Platform)

**On this device:**
```powershell
cd seva_platform
# Build the project
.\apache-maven-3.9.9\bin\mvn.cmd clean package -DskipTests
# Run the application
& 'C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot\bin\java.exe' -jar target/platform-0.0.1-SNAPSHOT.jar
```

**On a new device:**
```bash
cd seva_platform
mvn clean package -DskipTests
java -jar target/platform-0.0.1-SNAPSHOT.jar
```

---

### 2. Run the Frontend (Seva UI)

**On any device:**
```bash
cd seva_ui
# Install dependencies (first time only)
npm install
# Run in development mode
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000) and the backend APIs at [http://localhost:8080](http://localhost:8080).

## Project Structure
- `seva_ui/`: Next.js frontend application.
- `seva_platform/`: Spring Boot backend platform.
- `seva_mobile/`: React Native mobile blueprint (Phase 2).