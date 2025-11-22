resource "aws_apigatewayv2_api" "http_api" {
  name          = "${var.name_prefix}-http"
  protocol_type = "HTTP"

  tags = var.common_tags
}

resource "aws_apigatewayv2_integration" "lambda" {
  for_each = var.lambda_functions

  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = each.value.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

resource "aws_apigatewayv2_route" "routes" {
  for_each = var.create_apigateway ? var.api_routes : {}

  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "${each.value.method} ${each.value.path}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda[each.value.function_key].id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  count             = var.create_apigateway ? 1 : 0
  name              = "/aws/apigateway/${aws_apigatewayv2_api.http_api.name}"
  retention_in_days = var.log_retention_in_days

  tags = var.common_tags
}

resource "aws_apigatewayv2_stage" "default" {
  count       = var.create_apigateway ? 1 : 0
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw[0].arn
    format = jsonencode({
      requestId        = "$context.requestId"
      sourceIp         = "$context.identity.sourceIp"
      requestTime      = "$context.requestTime"
      protocol         = "$context.protocol"
      httpMethod       = "$context.httpMethod"
      resourcePath     = "$context.routeKey"
      status           = "$context.status"
      responseLength   = "$context.responseLength"
      integrationError = "$context.integrationError"
    })
  }

  tags = var.common_tags
}

resource "aws_lambda_permission" "apigw" {
  for_each = var.create_apigateway ? var.api_routes : {}

  statement_id = "AllowAPIGatewayInvoke-${replace(replace(replace(replace(replace(each.key, ":", "-"), " ", "-"), "/", "-"), "{", ""), "}", "")}"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_functions[each.value.function_key].function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}
