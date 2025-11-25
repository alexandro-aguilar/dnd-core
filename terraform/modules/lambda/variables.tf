variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
}

variable "lambda_configs" {
  description = "Map of Lambda function configurations"
  type = map(object({
    source_file   = string
    handler       = string
    runtime       = string
    description   = string
    memory_size   = number
    timeout       = number
    architectures = list(string)
    environment   = map(string)
    layers        = list(string)
    routes = list(object({
      method             = string
      path               = string
      authorization_type = optional(string)
      authorizer_id      = optional(string)
    }))
  }))
}

variable "lambda_exec_role_arn" {
  description = "ARN of the Lambda execution role"
  type        = string
}

variable "log_retention_in_days" {
  description = "CloudWatch log retention period"
  type        = number
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}

variable "use_localstack" {
  description = "Whether to use LocalStack for local development with hot reload"
  type        = bool
  default     = false
}

variable "hot_reload_bucket" {
  description = "S3 bucket name for hot reload functionality"
  type        = string
  default     = "hot-reload"
}
