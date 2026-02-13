[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Op9BxO3Q)
# hackathon-starter (Seva Platform)

Hackathon Starter Repo

Seva Platform is a modern, scalable, full-stack application designed to serve mobile users, web users, and backend services through a secure and modular architecture.

This repository is the **starter blueprint** for the Seva Platform. It defines:
- What the project is
- How the repository is organized
- What technologies (latest stable) should be used
- The standard directory structure each module must follow

The platform consists of:
- A **mobile application** for Android and iOS
- A **web application** for browser-based access
- A **backend platform** providing APIs, business logic, and data persistence


All components communicate through secure REST APIs and follow cloud-ready, production-grade design principles.


```text
.
├── seva_mobile/        # React Native mobile application
├── seva_ui/            # Web UI application (React or Angular)
├── seva_platform/      # Backend platform (Java + Spring Boot)
└── README.md           # Project documentation
```

---

## High-Level Architecture

> Both Mobile and Web clients communicate only with the backend APIs (clients do not talk to the database directly).

```text
Mobile App (React Native) ──┐
                            ├──> Backend APIs (Spring Boot) ───> Database (MySQL 8.x)
Web UI (React / Angular) ───┘
```


# Application project structre to be followed

seva_mobile/
├── android/                 # Android native project
├── ios/                     # iOS native project
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # App screens
│   ├── navigation/          # Navigation setup
│   ├── services/            # API services
│   ├── store/               # State management
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utilities
│   └── assets/              # Images, fonts, icons
├── .env
├── package.json
└── tsconfig.json


seva_ui/
├── src/
│   ├── components/          # Shared UI components
│   ├── pages/               # Route-based pages
│   ├── layouts/             # App layouts
│   ├── services/            # API clients
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Helper utilities
│   └── assets/              # Static assets
├── public/
├── .env
├── package.json
└── tsconfig.json


seva_platform/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/seva/platform/
│   │   │       ├── controller/     # REST controllers
│   │   │       ├── service/        # Business logic
│   │   │       ├── repository/     # Database repositories
│   │   │       ├── model/          # Entity models
│   │   │       ├── dto/            # Request/response DTOs
│   │   │       ├── security/       # Authentication & security
│   │   │       └── config/         # Configuration classes
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/migration/       # Flyway migrations
│   └── test/
├── Dockerfile
├── pom.xml / build.gradle
└── README.md