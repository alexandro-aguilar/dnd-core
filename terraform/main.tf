# Main Terraform configuration using modular architecture
# This demonstrates clean modular architecture with proper separation of concerns

# S3 Hot Reload Bucket for LocalStack (only when use_localstack is true)
resource "aws_s3_bucket" "hot_reload" {
  count  = var.use_localstack ? 1 : 0
  bucket = "hot-reload"

  tags = local.common_tags
}

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
  use_localstack        = var.use_localstack
  hot_reload_bucket     = var.use_localstack ? aws_s3_bucket.hot_reload[0].bucket : ""
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

# resource "aws_lambda_function" "my_hot_reload_lambda" {
#   function_name = "my-local-function"

#   # Use the special S3 bucket for hot-reloading
#   s3_bucket = aws_s3_bucket.hot_reload.bucket

#   # Set the S3 key to the absolute path of your local source code directory
#   # The path must be accessible by the Docker container (e.g., a mounted volume)
#   s3_key    = "/Users/mac/Developer/dnd/dnd-terraform/.dist" 

#   # The handler should reference the filename and function in your mounted code
#   # e.g., for 'handler.py' and function 'my_handler', use 'handler.my_handler'
#   handler = "exampleHandler.handler" 
#   runtime = "nodejs22.x"

#   # Use the Lambda execution role from the IAM module
#   role = module.iam.lambda_role_arn

#   # Environment variable to help LocalStack find the code
#   environment {
#     variables = {
#       NODE_ENV = "local"
#     }
#   }

#   tags = local.common_tags
# }

# Additional environment-specific resources can be added here
# For example: S3 buckets, DynamoDB tables, etc.
