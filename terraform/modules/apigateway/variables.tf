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
    function_key       = string
    method             = string
    path               = string
    authorization_type = optional(string, null)
    authorizer_id      = optional(string, null)
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

variable "default_authorization_type" {
  description = "Default authorization type to apply to routes"
  type        = string
  default     = "NONE"
}

variable "jwt_authorizer" {
  description = "Optional JWT authorizer configuration"
  type = object({
    name             = string
    issuer           = string
    audience         = list(string)
    identity_sources = optional(list(string), ["$request.header.Authorization"])
  })
  default = null
}
