#!/bin/bash
set -e

echo "Starting Azure CLI script"

echo "Azure account info"
az account show

echo "Installing Terraform"

wget -q https://releases.hashicorp.com/terraform/1.8.5/terraform_1.8.5_linux_amd64.zip

unzip -o terraform_1.8.5_linux_amd64.zip

sudo mv terraform /usr/local/bin/

terraform version

echo "Running Terraform"

terraform init

terraform plan \
    -var-file="terraform.tfvars" \
    -input=false \
    -out=tfplan

# Uncomment if needed
# terraform apply -auto-approve

echo "Script completed"