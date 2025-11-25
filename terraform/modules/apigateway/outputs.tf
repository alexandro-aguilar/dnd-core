output "api_gateway_id" {
  description = "API Gateway ID"
  value       = aws_apigatewayv2_api.http_api.id
}

output "api_gateway_arn" {
  description = "API Gateway ARN"
  value       = aws_apigatewayv2_api.http_api.arn
}

output "api_gateway_execution_arn" {
  description = "API Gateway execution ARN"
  value       = aws_apigatewayv2_api.http_api.execution_arn
}

output "api_gateway_endpoint" {
  description = "API Gateway invoke URL"
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}

output "stage_invoke_url" {
  description = "Stage invoke URL"
  value       = var.create_apigateway ? "${aws_apigatewayv2_api.http_api.api_endpoint}/" : null
}

output "jwt_authorizer_id" {
  description = "ID of the JWT authorizer when created"
  value       = var.jwt_authorizer != null && var.create_apigateway ? aws_apigatewayv2_authorizer.jwt[0].id : null
}
