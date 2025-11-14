# AWS Configuration defaults
# LocalStack environment settings (for local development)

aws_region = "us-east-1"

# Infrastructure settings
create_apigateway = true

# LocalStack endpoints (only used when use_localstack = true)
localstack_endpoints = {
  apigateway     = "http://localhost:4566"
  apigatewayv2   = "http://localhost:4566"
  cloudwatch     = "http://localhost:4566"
  cloudwatchlogs = "http://localhost:4566"
  iam            = "http://localhost:4566"
  lambda         = "http://localhost:4566"
  logs           = "http://localhost:4566"
  s3             = "http://localhost:4566"
  sts            = "http://localhost:4566"
}