#!/bin/bash

# Neuro-Sync Protocol v3.0
# Automatic Repository Initialization Script (GitHub & GitLab)
# Usage: ./neuro-sync-init.sh <USER_IID> <PROJECT_NAME>

USER_IID=$1
PROJECT_NAME=$2
GITHUB_TOKEN=${GITHUB_TOKEN:-"YOUR_GITHUB_TOKEN"}
GITLAB_TOKEN=${GITLAB_TOKEN:-"YOUR_GITLAB_TOKEN"}

if [[ -z "$USER_IID" || -z "$PROJECT_NAME" ]]; then
    echo "Usage: ./neuro-sync-init.sh <USER_IID> <PROJECT_NAME>"
    exit 1
fi

echo "🚀 Initializing Neuro-Sync Digital Vault for User: $USER_IID"

# 1. Create GitHub Private Repository
echo "📦 Creating GitHub Private Repo: $PROJECT_NAME..."
curl -H "Authorization: token $GITHUB_TOKEN" \
     -d "{\"name\":\"$PROJECT_NAME\",\"private\":true,\"description\":\"NeuroSphere Digital Vault for $USER_IID\"}" \
     https://api.github.com/user/repos

# 2. Create GitLab Private Project
echo "📦 Creating GitLab Private Project: $PROJECT_NAME..."
curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
     -X POST "https://gitlab.com/api/v4/projects?name=$PROJECT_NAME&visibility=private"

# 3. Initialize Local Edge Storage (Termux/HP)
echo "📱 Initializing Local Edge Node..."
mkdir -p ~/neuro-sync/$PROJECT_NAME
cd ~/neuro-sync/$PROJECT_NAME
git init
git remote add github https://github.com/user/$PROJECT_NAME.git
git remote add gitlab https://gitlab.com/user/$PROJECT_NAME.git

echo "✅ Neuro-Sync Protocol Initialized Successfully."
echo "🔗 Parallel Sync Active: [GitHub] <-> [GitLab] <-> [Edge Node]"
