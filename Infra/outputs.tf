output "resource_group_name" {
  description = "AKS Resource Group Name"
  value       = azurerm_resource_group.base.name
}

output "aks_cluster_name" {
  description = "AKS Cluster Name"
  value       = azurerm_kubernetes_cluster.base.name
}

output "aks_cluster_location" {
  description = "AKS Location"
  value       = azurerm_kubernetes_cluster.base.location
}