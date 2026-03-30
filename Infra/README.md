# 🏗 Terraform Infrastructure – AKS Deployment

This folder contains Terraform code used to provision Azure infrastructure.

## 📦 Resources Created

- Azure Resource Group
- Virtual Network
- Subnet
- Azure Kubernetes Service (AKS)
- Backend storage for Terraform state

---

## 📂 Files

- main.tf → Main infrastructure resources
- variables.tf → Input variables
- outputs.tf → Output values
- test.tfvars → Environment variable values

---

## ▶️ How to Run Manually

```bash
cd Infra
terraform init
terraform plan -var-file="test.tfvars"
terraform apply -var-file="test.tfvars"

🔐 Remote Backend

Terraform state is stored in Azure Storage Account.

Backend config is initialized inside:

Scripts/terraform.sh
📤 Outputs

After successful apply:

terraform output

Important outputs:

resource_group_name

aks_cluster_name

These are used by the pipeline to configure kubectl.