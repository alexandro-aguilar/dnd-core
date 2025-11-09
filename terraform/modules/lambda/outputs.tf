output "lambda_functions" {
  description = "Map of created Lambda functions"
  value       = aws_lambda_function.this
}

output "lambda_function_arns" {
  description = "Map of Lambda function ARNs"
  value = {
    for k, v in aws_lambda_function.this : k => v.arn
  }
}

output "lambda_function_invoke_arns" {
  description = "Map of Lambda function invoke ARNs"
  value = {
    for k, v in aws_lambda_function.this : k => v.invoke_arn
  }
}

output "lambda_function_names" {
  description = "Map of Lambda function names"
  value = {
    for k, v in aws_lambda_function.this : k => v.function_name
  }
}