#!/bin/bash
set -e

echo "========================================="
echo " Checking Terraform Installation"
echo "========================================="

# If Terraform already exists, skip installation
if command -v terraform &> /dev/null
then
    echo "Terraform is already installed:"
    terraform -version
    exit 0
fi

echo "========================================="
echo " Installing Terraform from HashiCorp APT Repo"
echo "========================================="

# Update packages
sudo apt-get update -y

# Install required dependencies
sudo apt-get install -y gnupg software-properties-common curl

# Add HashiCorp GPG key
curl -fsSL https://apt.releases.hashicorp.com/gpg | \
  sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg

# Add official HashiCorp repository
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

# Update apt again
sudo apt-get update -y

# Install Terraform
sudo apt-get install -y terraform

echo "========================================="
echo " Terraform Installed Successfully"
echo "========================================="

terraform -version