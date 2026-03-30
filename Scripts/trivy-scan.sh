#!/bin/bash
set -e

echo "Installing Trivy..."

sudo apt-get update
sudo apt-get install wget gnupg lsb-release -y

wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | \
gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null

echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | \
sudo tee /etc/apt/sources.list.d/trivy.list

sudo apt-get update
sudo apt-get install trivy -y

IMAGE=$1

echo "Scanning image: $IMAGE"

mkdir -p trivy-reports

echo "Generating table report..."
trivy image --format table -o trivy-reports/trivy-report.txt $IMAGE

echo "Generating JSON report..."
trivy image --format json -o trivy-reports/trivy-report.json $IMAGE

echo "Downloading HTML template..."
wget https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl

echo "Generating HTML report..."

trivy image \
--scanners vuln \
--severity HIGH,CRITICAL \
--format template \
--template "@html.tpl" \
-o trivy-reports/trivy-report.html \
$IMAGE

echo "Trivy scan completed"
