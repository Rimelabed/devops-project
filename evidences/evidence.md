# DevOps Project — CI/CD Pipeline Build & Deployment Evidence

This document provides a complete, clean, and anonymized overview of the CI/CD pipeline implementation — from environment setup to successful Jenkins execution.  
All sensitive data such as IP addresses, commit hashes, and emails have been masked for security.

---

## 1. Virtual Machine Initialization

```bash
rimelabed@oscar:~$ lab-startup.py lab-sw.yaml
Copying base image to devops-vm.qcow2...
done.
Creating devops-vm_OVMF_VARS.fd file...
Starting devops-vm...
Waiting for TPM socket to be ready.

~> Virtual machine filename   : devops-vm.qcow2
~> RAM size                   : 4096
~> SPICE VDI port number      : 6201
~> telnet console port number : 2601
~> MAC address                : ******
~> Switch port interface      : tap301, access mode
~> IPv6 LL address            : ******
devops-vm started successfully!
```
## 2. Docker Installation and Verification
```bash
┌─[etu][devops-vm][~]
└─▪ docker -v
Docker version 28.2.2, build 28.2.2-0ubuntu1~25.04.1

┌─[etu][devops-vm][~]
└─▪ sudo systemctl status docker
● docker.service - Docker Application Container Engine
     Active: active (running)
     Main PID: 2037 (dockerd)
```

## 3. Development Environment Setup
```bash
git --version
git version 2.48.1

node -v && npm -v
v20.18.1
9.2.0

python3 -V
Python 3.13.3
```
## 4. Docker Compose Build and Container Deployment
```bash
┌─[etu][devops-vm][~/devops-project]
└─▪ docker compose up --build -d
WARN[0000] the attribute `version` is obsolete
[+] Building 16.0s (22/22) FINISHED
 => [backend] FROM docker.io/library/python:3.12-slim@sha256:********
 => [frontend] FROM docker.io/library/node:20-alpine@sha256:********
 backend   Built
 frontend  Built
 Network devops-project_default  Created
 Container backend               Started
 Container frontend              Started
```
## 5. Jenkins Docker Integration

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
sudo su - jenkins -s /bin/bash

jenkins@devops-vm:~$ docker ps
CONTAINER ID   IMAGE                     PORTS
************    devops-project-frontend   0.0.0.0:3000->3000/tcp
************    devops-project-backend    0.0.0.0:5000->5000/tcp
```
## 6. Ngrok Configuration for GitHub Webhook

Ngrok was used to expose Jenkins securely to GitHub, since the virtual machine runs in a private lab network without a public IP.

This allowed GitHub to trigger Jenkins automatically on each repository push.
## 7. Jenkins Pipeline Execution Logs
```bash
Started by GitHub push by <username>
Obtained Jenkinsfile from git https://github.com/<username>/devops-project
[Pipeline] Start of Pipeline
Running on Jenkins in /var/lib/jenkins/workspace/DevOps-CI-CD

[Pipeline] stage (Build Docker Images)
+ docker compose build
 backend  Built
 frontend Built

[Pipeline] stage (Run Tests)
+ docker run --rm devops-ci-cd-backend pytest
============================= test session starts ==============================
collected 0 items
============================ no tests ran in 0.00s =============================

[Pipeline] stage (Deploy Containers)
+ docker rm -f backend frontend
+ docker compose down
+ docker compose up -d
Containers deployed successfully.

[Pipeline] stage (Post Actions)
Sending email to: ********
Finished: SUCCESS
```
## 8. Metadata

- Author: Rim El Abed

- Date: October 2025

* File: ci_cd_pipeline_build.md

- Purpose: Evidence of CI/CD pipeline implementation and validation.
