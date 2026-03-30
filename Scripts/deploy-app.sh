#!/bin/bash
set -e

echo "Deploying Kubernetes manifests..."
kubectl apply -f Kubernetes/

kubectl rollout status deployment/netflix-app --timeout=300s

echo "Waiting for LoadBalancer IP..."

for i in {1..30}; do
  EXTERNAL_IP=$(kubectl get svc netflix-app -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  
  if [ -n "$EXTERNAL_IP" ]; then
    break
  fi

  sleep 10
done

echo "Application URL: http://$EXTERNAL_IP"