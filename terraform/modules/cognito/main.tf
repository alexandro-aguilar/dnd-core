data "aws_partition" "current" {}
data "aws_region" "current" {}

resource "aws_cognito_user_pool" "this" {
  name = "${var.name_prefix}-users"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  mfa_configuration = "OFF"

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  tags = var.common_tags
}

resource "aws_cognito_user_pool_client" "this" {
  name         = "${var.name_prefix}-app-client"
  user_pool_id = aws_cognito_user_pool.this.id

  generate_secret                               = var.client_generate_secret
  prevent_user_existence_errors                 = "ENABLED"
  supported_identity_providers                  = ["COGNITO"]
  allowed_oauth_flows_user_pool_client          = false
  enable_token_revocation                       = true
  enable_propagate_additional_user_context_data = true

  explicit_auth_flows = [
    "ALLOW_ADMIN_USER_PASSWORD_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]

  callback_urls = var.client_callback_urls
  logout_urls   = var.client_logout_urls

  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  access_token_validity  = 60
  id_token_validity      = 60
  refresh_token_validity = 30
}

resource "aws_cognito_user" "default" {
  count = var.default_user == null ? 0 : 1

  user_pool_id = aws_cognito_user_pool.this.id
  username     = var.default_user.username
  password     = var.default_user.password

  attributes = {
    email          = var.default_user.email
    email_verified = "true"
  }

  message_action = "SUPPRESS"
}

locals {
  issuer = "https://cognito-idp.${data.aws_region.current.name}.${data.aws_partition.current.dns_suffix}/${aws_cognito_user_pool.this.id}"
}
