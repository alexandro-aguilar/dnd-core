locals {
  name_prefix        = "${var.project_name}-${var.environment}"
  provider_endpoints = var.use_localstack ? var.localstack_endpoints : {}

  lambda_defaults = {
    description   = null
    memory_size   = 128
    timeout       = 10
    runtime       = "nodejs22.x"
    handler       = "index.handler"
    architectures = ["arm64"]
    environment   = {}
    layers        = []
    routes        = []
    source_file   = null
  }

  lambda_configs = {
    for name, cfg in var.lambda_functions :
    name => merge(local.lambda_defaults, cfg)
  }

  default_route_authorization_type = upper(coalesce(var.api_default_authorization_type, var.enable_cognito_authorizer ? "JWT" : "NONE"))

  route_defaults = {
    authorization_type = null
    authorizer_id      = null
  }

  api_routes_list = flatten([
    for fn_key, cfg in local.lambda_configs : [
      for route in cfg.routes : merge(local.route_defaults, route, {
        function_key = fn_key
        method       = upper(route.method)
        path         = route.path
      })
    ]
  ])

  api_routes = {
    for route in local.api_routes_list :
    "${route.function_key}:${route.method} ${route.path}" => merge(route, {
      authorization_type = upper(coalesce(route.authorization_type, local.default_route_authorization_type))
    })
  }

  common_tags = {
    Project = var.project_name
    Env     = var.environment
  }
}
