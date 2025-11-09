variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
}

variable "lambda_functions" {
  description = "Map of Lambda function objects"
  type        = any
}

variable "api_routes" {
  description = "Map of API routes"
  type = map(object({
    function_key = string
    method       = string
    path         = string
  }))
}

variable "create_apigateway" {
  description = "Whether to create API Gateway resources"
  type        = bool
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