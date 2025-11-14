resource "aws_cloudwatch_log_group" "lambda" {
  for_each          = var.lambda_configs
  name              = "/aws/lambda/${var.name_prefix}-${each.key}"
  retention_in_days = var.log_retention_in_days

  tags = var.common_tags
}

data "archive_file" "lambda" {
  for_each    = var.lambda_configs
  type        = "zip"
  source_file = each.value.source_file
  output_path = "${path.module}/.dist/${each.key}.zip"
}

resource "aws_lambda_function" "this" {
  for_each = var.lambda_configs

  function_name = "${var.name_prefix}-${each.key}"

  # For LocalStack: use S3 hot-reload bucket with absolute path
  # For AWS: use zip file
  s3_bucket = var.use_localstack ? var.hot_reload_bucket : null
  s3_key    = var.use_localstack && each.value.source_file != null ? abspath(dirname(each.value.source_file)) : null

  # filename         = var.use_localstack ? null : data.archive_file.lambda[each.key].output_path
  source_code_hash = var.use_localstack ? null : data.archive_file.lambda[each.key].output_base64sha256

  handler       = each.value.handler
  runtime       = each.value.runtime
  description   = each.value.description
  role          = var.lambda_exec_role_arn
  memory_size   = each.value.memory_size
  timeout       = each.value.timeout
  architectures = each.value.architectures
  layers        = each.value.layers

  environment {
    variables = each.value.environment
  }

  depends_on = [aws_cloudwatch_log_group.lambda]

  tags = var.common_tags
}