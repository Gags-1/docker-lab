# Task Manager

A containerized full-stack Task Manager application built to demonstrate practical DevOps and cloud deployment concepts.

The project consists of a frontend, FastAPI backend, and PostgreSQL database. The application is containerized with Docker and uses GitHub Actions for continuous integration and automated Docker image publishing.

> **Project Status:** CI/CD deployment to AWS EC2 has been successfully implemented and tested.

---

## Architecture

```text
                         GitHub Repository
                               |
                               v
                        GitHub Actions
                               |
                    +----------+----------+
                    |                     |
              Build & Test          Docker Build
                    |                     |
                    |                     v
                    |                Docker Hub
                    |                     |
                    |              Backend + Frontend
                    |                     |
                    +----------+----------+
                               |
                               v
                         Docker Compose
                               |
              +----------------+----------------+
              |                |                |
              v                v                v
         Frontend           Backend         PostgreSQL
         Nginx               FastAPI
         :3000               :8000
              |                |
              +------- API ----+
```

---

## Tech Stack

### Application

- **Frontend:** HTML / CSS / JavaScript
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL 16

### Containerization

- Docker
- Docker Compose
- Docker Hub

### CI/CD

- GitHub Actions
- Automated Docker image builds
- Automated Docker image publishing
- Automated application testing
- Automated deployment to AWS EC2

### Cloud

- AWS EC2
- Amazon Linux 2023
- SSH
- Security Groups

---

## Project Structure

```text
task-manager/
│
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .dockerignore
│
├── frontend/
│   ├── Dockerfile
│   └── ...
│
├── compose.yaml
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Application Components

### Frontend

The frontend provides the user interface for managing tasks.

It communicates with the backend through REST API endpoints.

The frontend container uses Nginx and is exposed on:

```text
http://localhost:3000
```

### Backend

The backend is built with FastAPI and provides REST API endpoints for task management.

Available endpoints include:

```text
GET    /health
GET    /tasks
POST   /tasks
DELETE /tasks/{task_id}
```

The backend runs on:

```text
http://localhost:8000
```

A health endpoint is provided for container health checks:

```text
GET /health
```

### Database

The application uses PostgreSQL 16.

The database runs as a separate Docker container and communicates with the backend through the Docker Compose network.

A persistent Docker volume is used for PostgreSQL data:

```text
postgres-data
```

The backend automatically initializes the `tasks` table when the application starts if the table does not already exist.

---

# Docker

Each application component runs inside its own container.

Docker Compose manages the complete application stack:

```text
Frontend
   |
Backend
   |
PostgreSQL
```

Start the application locally:

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

View backend logs:

```bash
docker compose logs backend
```

View database logs:

```bash
docker compose logs db
```

Stop the application:

```bash
docker compose down
```

---

# CI Pipeline

GitHub Actions is used to automate the continuous integration process.

The pipeline performs the following steps:

```text
Git Push
   |
   v
Checkout Repository
   |
   v
Login to Docker Hub
   |
   v
Build Backend Image
   |
   v
Push Backend Image
   |
   v
Build Frontend Image
   |
   v
Push Frontend Image
   |
   v
Start Application
   |
   v
Health Checks
   |
   v
Application Verification
   |
   v
Shutdown Test Environment
```

The pipeline verifies that the application can be built and started successfully before deployment.

---

# Docker Images

The application images are published to Docker Hub.

### Backend

```text
gagan681/docker-lab-backend
```

### Frontend

```text
gagan681/docker-lab-frontend
```

The Docker Hub repository names are intentionally retained from the initial development phase.

---

# AWS Deployment

The application was also deployed to an AWS EC2 instance running Amazon Linux 2023.

The deployment process used:

```text
GitHub Actions
      |
      | SSH
      v
AWS EC2
      |
      v
Docker Compose
      |
      +---- Frontend
      |
      +---- Backend
      |
      +---- PostgreSQL
```

The GitHub Actions deployment process:

1. Starts an SSH agent.
2. Loads the EC2 private key from GitHub Secrets.
3. Retrieves and verifies the EC2 host key.
4. Establishes an SSH connection.
5. Connects to the EC2 instance.
6. Pulls the latest Docker images.
7. Updates the running containers using Docker Compose.
8. Verifies container status.

The EC2 deployment was successfully tested end-to-end.

---

# Security

Sensitive credentials are not stored directly in the repository.

GitHub Actions uses encrypted GitHub Secrets for values such as:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
EC2_HOST
EC2_USER
EC2_SSH_KEY
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
```

The EC2 SSH private key is loaded into an ephemeral SSH agent during the GitHub Actions deployment process rather than being committed to the repository.

---

# Key DevOps Concepts Demonstrated

This project demonstrates practical experience with:

- Linux command line
- Git and GitHub
- GitHub Actions
- CI/CD concepts
- Docker
- Docker Compose
- Docker image creation
- Docker Hub
- Container networking
- Container health checks
- PostgreSQL
- Persistent Docker volumes
- REST APIs
- FastAPI
- Nginx
- SSH
- AWS EC2
- AWS Security Groups
- Secrets management
- Automated application deployment
- Troubleshooting failed CI/CD pipelines

---

# Troubleshooting Experience

During development, several real-world deployment issues were identified and resolved, including:

### YAML workflow errors

GitHub Actions workflow indentation and YAML validation issues were identified using `yamllint`.

### SSH private key formatting

The EC2 private key required the complete PEM structure:

```text
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
```

The key was loaded securely through `ssh-agent` and `ssh-add`.

### EC2 host key verification

SSH initially failed because the GitHub Actions runner did not know the EC2 host.

The deployment workflow was updated to retrieve the EC2 host key using:

```bash
ssh-keyscan
```

and configure `known_hosts` before establishing the connection.

### Database initialization

The backend initially failed with:

```text
psycopg2.errors.UndefinedTable:
relation "tasks" does not exist
```

The backend was updated to initialize the required database table automatically when starting.

This allowed the application to work correctly with a fresh PostgreSQL environment while preserving existing data.

---

# Future Improvements

Planned improvements include:

- AWS IAM fundamentals
- AWS VPC architecture
- Public and private subnets
- EC2 security hardening
- AWS EBS
- S3
- CloudWatch monitoring
- Infrastructure as Code with Terraform
- Improved CI/CD deployment strategies
- Image versioning instead of relying only on `latest`
- Production-grade secrets management
- HTTPS with a domain and TLS certificate
- Application monitoring and logging
- Deployment rollback strategies

---

# What I Learned

This project was built as a hands-on DevOps learning project with a focus on understanding the complete path from source code to a running cloud application.

The project helped develop practical experience with:

```text
Source Code
     ↓
Git
     ↓
GitHub
     ↓
GitHub Actions
     ↓
Docker
     ↓
Docker Hub
     ↓
AWS EC2
     ↓
Docker Compose
     ↓
Running Application
```

The next phase of the project will focus on understanding AWS infrastructure and cloud architecture before expanding the CI/CD implementation further.

---

## Author

**Gagan**

Aspiring DevOps / GenAI Developer

