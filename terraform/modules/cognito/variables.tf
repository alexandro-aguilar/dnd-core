variable "name_prefix" {
  description = "Prefix for Cognito resources"
  type        = string
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}

variable "client_generate_secret" {
  description = "Whether the user pool client should generate a secret"
  type        = bool
  default     = false
}

variable "client_callback_urls" {
  description = "Callback URLs for the user pool client"
  type        = list(string)
  default     = []
}

variable "client_logout_urls" {
  description = "Logout URLs for the user pool client"
  type        = list(string)
  default     = []
}

variable "default_user" {
  description = "Optional default user to seed into the user pool"
  type = object({
    username = string
    password = string
    email    = string
  })
  sensitive = true
  default   = null
}

variable "enable_post_confirmation" {
  description = "Whether to wire a post-confirmation trigger Lambda"
  type        = bool
  default     = false
}

variable "post_confirmation_lambda_arn" {
  description = "Optional Lambda ARN to invoke after Cognito user confirmation"
  type        = string
  default     = null
}
