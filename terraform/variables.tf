variable "project_name" {
  description = "Short name for the application; used as part of resource names."
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9-]{1,20}$", var.project_name))
    error_message = "Project name must be 1-20 characters, lowercase letters, numbers, and hyphens only."
  }
}

variable "environment" {
  description = "Deployment environment identifier (e.g. local, dev, prod)."
  type        = string
  default     = "local"

  validation {
    condition     = contains(["local", "dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: local, dev, staging, prod."
  }
}

variable "aws_region" {
  description = "AWS region or LocalStack pseudo-region to deploy into."
  type        = string
  default     = "us-east-1"
}

variable "use_localstack" {
  description = "Whether to point the AWS provider to LocalStack endpoints."
  type        = bool
  default     = true
}

variable "localstack_endpoints" {
  description = "Service endpoints for LocalStack; ignored when use_localstack is false."
  type        = map(string)
  default = {
    apigateway     = "http://localhost:4566"
    apigatewayv2   = "http://localhost:4566"
    cloudwatch     = "http://localhost:4566"
    cloudwatchlogs = "http://localhost:4566"
    iam            = "http://localhost:4566"
    lambda         = "http://localhost:4566"
    logs           = "http://localhost:4566"
    s3             = "http://localhost:4566"
    cognitoidp     = "http://localhost:4566"
    sts            = "http://localhost:4566"
  }
}

variable "log_retention_in_days" {
  description = "CloudWatch log retention period for Lambda and API Gateway logs."
  type        = number
  default     = 7

  validation {
    condition     = contains([1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1827, 3653], var.log_retention_in_days)
    error_message = "Log retention must be a valid CloudWatch Logs retention period."
  }
}

variable "create_apigateway" {
  description = "Set to false to skip creating API Gateway routes (useful for ad-hoc Lambda testing)."
  type        = bool
  default     = true
}

variable "enable_cognito_authorizer" {
  description = "Create Cognito resources and wire a JWT authorizer into API Gateway."
  type        = bool
  default     = true
}

variable "enable_cognito_post_confirmation" {
  description = "Wire Cognito post-confirmation trigger to sync users into the database."
  type        = bool
  default     = true
}

variable "api_default_authorization_type" {
  description = "Default authorization type applied to all routes (use NONE to bypass auth)."
  type        = string
  default     = null
}

variable "cognito_client_generate_secret" {
  description = "Whether the Cognito user pool client should generate a secret."
  type        = bool
  default     = false
}

variable "cognito_client_callback_urls" {
  description = "Callback URLs for the Cognito user pool client."
  type        = list(string)
  default     = []
}

variable "cognito_client_logout_urls" {
  description = "Logout URLs for the Cognito user pool client."
  type        = list(string)
  default     = []
}

variable "lambda_functions" {
  description = "Map of Lambda definitions keyed by logical function name."
  type = map(object({
    source_file   = string
    handler       = optional(string)
    runtime       = optional(string)
    description   = optional(string)
    memory_size   = optional(number)
    timeout       = optional(number)
    architectures = optional(list(string))
    environment   = optional(map(string))
    layers        = optional(list(string))
    routes = optional(list(object({
      method             = string
      path               = string
      authorization_type = optional(string)
      authorizer_id      = optional(string)
    })), [])
  }))
  default = {}
}
