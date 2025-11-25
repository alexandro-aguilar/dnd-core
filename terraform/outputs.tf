output "lambda_function_arns" {
  description = "ARNs per logical Lambda key."
  value       = module.lambda.lambda_function_arns
}

output "lambda_function_names" {
  description = "Names per logical Lambda key."
  value       = module.lambda.lambda_function_names
}

output "http_api_endpoint" {
  description = "Invoke URL for the shared HTTP API."
  value       = module.apigateway.api_gateway_endpoint
}

output "stage_invoke_url" {
  description = "Complete invoke URL with stage."
  value       = module.apigateway.stage_invoke_url
}

output "api_gateway_id" {
  description = "API Gateway ID."
  value       = module.apigateway.api_gateway_id
}

output "cognito_user_pool_id" {
  description = "ID of the Cognito user pool."
  value       = module.cognito.user_pool_id
}

output "cognito_user_pool_client_id" {
  description = "ID of the Cognito user pool client."
  value       = module.cognito.user_pool_client_id
}

output "cognito_user_pool_issuer" {
  description = "Issuer URL for Cognito JWT validation."
  value       = module.cognito.user_pool_issuer
}
