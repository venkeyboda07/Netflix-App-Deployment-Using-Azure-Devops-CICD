
---

# 📁 3️⃣ `monitoring/README.md`

```markdown
# 📊 Monitoring Stack – Helm Deployment

This folder installs cluster monitoring using Helm.

Monitoring stack includes:

- Prometheus
- Grafana
- kube-state-metrics
- node-exporter

Helm chart used:
kube-prometheus-stack

---

## ▶️ Install Manually

```bash
bash monitoring.sh

📌 What This Script Does

Adds Prometheus Helm repo

Creates monitoring namespace

Installs kube-prometheus-stack

🔍 Verify Installation
kubectl get pods -n monitoring
kubectl get svc -n monitoring
🌐 Access Grafana

Get external IP:

kubectl get svc -n monitoring

Default credentials:

Username: admin

Password: prom-operator

🎯 Purpose

Monitoring is separated from application deployment
to maintain modular DevOps architecture.