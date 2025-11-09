variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}

variable "additional_policies" {
  description = "Additional IAM policies to attach to the Lambda role"
  type        = list(string)
  default     = []
}