# Staging environment configuration

project_name = "dnd"
environment  = "staging"

# AWS specific settings (no LocalStack)
use_localstack = false

# Staging settings - between dev and prod
log_retention_in_days = 14

# Lambda functions for STAGING environment
lambda_functions = {
  example = {
    source_file   = "../.dist/app/modules/example/interface/handlers/exampleHandler.js"
    handler       = "exampleHandler.handler"
    runtime       = "nodejs22.x"
    description   = "Example Lambda function for staging"
    memory_size   = 384 # Between dev (256) and prod (512)
    timeout       = 20  # Between dev (30) and prod (15)
    architectures = ["x86_64"]
    layers        = []
    environment = {
      NODE_ENV  = "staging"
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