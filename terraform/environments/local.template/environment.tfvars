# Local environment configuration
# This file contains only LOCAL-SPECIFIC overrides
# Note: Terraform requires all required fields to be present

project_name = "dnd"
environment  = "local"

# LocalStack specific settings
use_localstack = true

# Development-friendly settings
log_retention_in_days = 1

# Override Lambda functions for LOCAL environment
lambda_functions = {
  example = {
    source_file   = "../.dist/app/modules/example/interface/handlers/exampleHandler.js"
    handler       = "exampleHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Example Lambda function for local testing"
    memory_size   = 128
    timeout       = 10
    architectures = ["x86_64"]
    layers        = []
    environment = {
      NODE_ENV  = "local"
      LOG_LEVEL = "debug"
    }
    routes = [
      {
        method = "GET"
        path   = "/example"
      }
    ]
  }
}
