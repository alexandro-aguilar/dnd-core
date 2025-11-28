output "user_pool_id" {
  description = "ID of the Cognito user pool"
  value       = aws_cognito_user_pool.this.id
}

output "user_pool_arn" {
  description = "ARN of the Cognito user pool"
  value       = aws_cognito_user_pool.this.arn
}

output "user_pool_client_id" {
  description = "ID of the Cognito user pool client"
  value       = aws_cognito_user_pool_client.this.id
}

output "user_pool_client_secret" {
  description = "Secret for the Cognito user pool client when generated"
  value       = var.client_generate_secret ? aws_cognito_user_pool_client.this.client_secret : null
  sensitive   = true
}

output "user_pool_issuer" {
  description = "Issuer URL for JWT validation"
  value       = local.issuer
}

