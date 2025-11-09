# Production environment configuration

project_name = "dnd"
environment = "prod"

# AWS specific settings (no LocalStack)
use_localstack = false

# Production settings
log_retention_in_days = 30  # Longer retention for production

# Lambda functions for PROD environment
lambda_functions = {
  example = {
    source_file = "../.dist/app/modules/example/interface/handlers/exampleHandler.js"
    handler     = "exampleHandler.handler"
    runtime     = "nodejs22.x"
    description = "Example Lambda function for production"
    memory_size = 512  # More memory for production workloads
    timeout     = 15   # Reasonable timeout for production
    architectures = ["x86_64"]
    layers = []
    environment = {
      NODE_ENV  = "production"
      LOG_LEVEL = "warn"
    }
    routes = [
      {
        method = "GET"
        path   = "/example"
      }
    ]
  }
}