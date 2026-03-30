
---

# 📁 2️⃣ `k8s/README.md`

```markdown
# ☸ Kubernetes Manifests – Application Deployment

This folder contains Kubernetes YAML files to deploy the application into AKS.

---

## 📂 Files

- deployment.yaml → Application Deployment
- service.yaml → Service definition (ClusterIP / LoadBalancer)

---

## ▶️ Deploy Manually

Make sure kubectl is configured:

```bash
kubectl apply -f k8s/


Verify:

kubectl get pods
kubectl get svc
🚀 Pipeline Execution

Executed automatically via:

Scripts/deploy.sh
📌 Notes

Namespace can be configured inside YAML.

Image version is controlled by CI pipeline.

LoadBalancer service exposes the app externally.