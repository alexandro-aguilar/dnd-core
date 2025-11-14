# Development environment configuration

project_name = "dnd"
environment  = "dev"

# AWS specific settings (no LocalStack)
use_localstack = false

# Development settings
log_retention_in_days = 7

# Lambda functions for DEV environment
lambda_functions = {
  example = {
    source_file   = "../.dist/app/modules/example/interface/handlers/exampleHandler.js"
    handler       = "exampleHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Example Lambda function for development"
    memory_size   = 256 # More memory for dev environment
    timeout       = 30  # Longer timeout for debugging
    architectures = ["x86_64"]
    layers        = []
    environment = {
      NODE_ENV  = "development"
      LOG_LEVEL = "info"
    }
    routes = [
      {
        method = "GET"
        path   = "/example"
      }
    ]
  }
}