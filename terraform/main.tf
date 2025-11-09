# Main Terraform configuration using modular architecture
# This demonstrates clean modular architecture with proper separation of concerns

# IAM Module - Handles all IAM roles and policies
module "iam" {
  source = "./modules/iam"

  name_prefix = local.name_prefix
  common_tags = local.common_tags
  # additional_policies = ["arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"] # Example
}

# Lambda Module - Handles all Lambda-related resources
module "lambda" {
  source = "./modules/lambda"

  name_prefix           = local.name_prefix
  lambda_configs        = local.lambda_configs
  lambda_exec_role_arn  = module.iam.lambda_role_arn
  log_retention_in_days = var.log_retention_in_days
  common_tags           = local.common_tags
}

# API Gateway Module - Handles all API Gateway resources
module "apigateway" {
  source = "./modules/apigateway"

  name_prefix           = local.name_prefix
  lambda_functions      = module.lambda.lambda_functions
  api_routes            = local.api_routes
  create_apigateway     = var.create_apigateway
  log_retention_in_days = var.log_retention_in_days
  common_tags           = local.common_tags
}

# Additional environment-specific resources can be added here
# For example: S3 buckets, DynamoDB tables, etc.
