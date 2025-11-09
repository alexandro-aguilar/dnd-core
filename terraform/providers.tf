provider "aws" {
  region                      = var.aws_region
  access_key                  = var.use_localstack ? "test" : null
  secret_key                  = var.use_localstack ? "test" : null
  skip_credentials_validation = var.use_localstack
  skip_requesting_account_id  = var.use_localstack
  skip_metadata_api_check     = var.use_localstack
  s3_use_path_style           = var.use_localstack
  max_retries                 = var.use_localstack ? 1 : 3

  dynamic "endpoints" {
    for_each = var.use_localstack ? [1] : []
    content {
      apigateway     = lookup(var.localstack_endpoints, "apigateway", null)
      apigatewayv2   = lookup(var.localstack_endpoints, "apigatewayv2", null)
      cloudwatch     = lookup(var.localstack_endpoints, "cloudwatch", null)
      cloudwatchlogs = lookup(var.localstack_endpoints, "cloudwatchlogs", null)
      iam            = lookup(var.localstack_endpoints, "iam", null)
      lambda         = lookup(var.localstack_endpoints, "lambda", null)
      s3             = lookup(var.localstack_endpoints, "s3", null)
      sts            = lookup(var.localstack_endpoints, "sts", null)
    }
  }

  default_tags {
    tags = local.common_tags
  }
}