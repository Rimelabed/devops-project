# DevOps CI/CD Project

## Overview
This project demonstrates the implementation of a complete Continuous Integration and Continuous Deployment (CI/CD) workflow in a virtualized environment.  
The objective was to automate the entire development lifecycle — from source code updates to the deployment of Docker containers — using Jenkins, GitHub, and Docker Compose.

---

## 1. Infrastructure and Virtualization

The project was deployed on a local virtualized infrastructure built with **KVM** and **Ubuntu**.  
Two main configuration files were used to define and manage the virtual environment:

- **lab.yaml** describes the virtual machine image and defines the KVM-based environment, including the network topology, virtual machine specifications, and the necessary operating system setup.  
- **sw-lab.yaml** configures the virtual switch (on the hypervisor named *Oscar*) and manages the network ports that interconnect the virtual machine and the rest of the lab environment.

This structure ensures a clean network separation between components and a realistic lab architecture for DevOps automation testing.

---

## 2. Docker and Application Containerization

Within the virtual machine, Docker was installed to manage the application services through containers.  
Two main containers were used:
- A backend service based on Python.  
- A frontend service based on Node.js.

These containers are orchestrated using Docker Compose, which defines how they are built, networked, and deployed together.  
The purpose is to simulate a production-like multi-service application running in isolated, reproducible environments.

---

## 3. Continuous Integration and Continuous Deployment (CI/CD)

Jenkins was selected as the automation server to manage the CI/CD pipeline.  
It was configured to automatically build, test, and deploy the application whenever changes are pushed to the GitHub repository.

The pipeline follows these key stages:

1. **Source Code Retrieval** – Jenkins clones the latest version of the GitHub repository.  
2. **Build Phase** – The backend and frontend Docker images are rebuilt to ensure the latest code is packaged.  
3. **Testing Phase** – Basic automated tests are executed to validate the backend functionality.  
4. **Deployment Phase** – Running containers are stopped and replaced with new versions based on the latest build.  
5. **Notification Phase** – An email notification is sent automatically to report the success or failure of the build.

This approach ensures consistency, reliability, and traceability in each software delivery cycle.

---

## 4. Jenkins Configuration

Several Jenkins plugins were installed to support the pipeline:

- GitHub Integration Plugin  
- Docker and Docker Pipeline Plugins  
- Pipeline Plugin  
- Email Extension Plugin  
- Credentials Binding Plugin  

A fine-grained personal access token was created on GitHub and securely stored within Jenkins credentials.  
This enabled authenticated communication between Jenkins and the GitHub repository.

---

## 5. GitHub Webhook Integration

To enable automatic triggering of Jenkins pipelines after each push, a webhook was configured on GitHub.  
The webhook sends event notifications directly to Jenkins when new commits are made.

However, because the Jenkins server runs locally on a private virtual machine without a public IP address, GitHub cannot directly reach it.  
To solve this, **Ngrok** was introduced.

---

## 6. Ngrok Tunneling

Ngrok was used to create a secure HTTPS tunnel between the local Jenkins server and the external GitHub servers.  
This tool exposes the Jenkins service (running on port 8080) to the internet through a temporary and secure public URL.

The generated Ngrok URL was then configured as the webhook endpoint in GitHub, allowing GitHub to deliver event payloads directly to Jenkins even though the VM does not have a public IP address.

This solution ensures a stable communication channel between GitHub and Jenkins in a closed local environment.

---

## 7. Workflow Validation

The full automation process was successfully tested by performing code updates in the GitHub repository.  
Each new push automatically triggered the Jenkins pipeline, which built, tested, and deployed the updated application in Docker containers.  
Email notifications were sent at the end of each run to confirm the pipeline results.

---

## 8. Key Achievements

- Successful deployment of a CI/CD pipeline running entirely within a virtualized local infrastructure.  
- Secure integration between Jenkins and GitHub using Ngrok tunneling.  
- Automated testing and container deployment with Docker Compose.  
- Complete environment reproducibility through YAML-defined virtualization and network configuration.  
- Professional Jenkins configuration with credentials, notifications, and GitHub integration.

---

## 9. Conclusion

This project demonstrates the design and implementation of a fully automated CI/CD pipeline in a private virtualized environment.  
Despite the absence of a public network address, the combination of Jenkins, Docker, GitHub, and Ngrok provided an efficient and secure workflow for continuous delivery.  

It reflects a strong understanding of DevOps principles, environment automation, and modern software delivery practices — from infrastructure setup to application deployment.

