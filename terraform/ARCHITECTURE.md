# Terraform Architecture Guide

This document complements `terraform/README.md` by focusing solely on the design of the Terraform stack—how the modules fit together, how environments are isolated, and the patterns you can extend as the platform grows.

## Design Goals

1. **Composable modules** – Lambda and API Gateway can be deployed together or independently.
2. **Environment isolation** – Each environment receives its own backend state file and tfvars configuration.
3. **Operational consistency** – Identical workflows are available locally (LocalStack) and in AWS accounts.
4. **Gradual adoption** – Inline resources (`iam.tf`, `lambda.tf`, `apigateway.tf`) can coexist with modules while migrating legacy stacks.

## Module Responsibilities

### Lambda (`modules/lambda`)
- Creates Lambda functions, IAM execution roles (if desired), and CloudWatch Log Groups with retention settings.
- Accepts a map of function definitions containing code files, handler names, runtime, memory/timeout, and environment variables.
- Returns maps of function objects, ARNs, invoke ARNs, and function names for downstream consumers.

### API Gateway (`modules/apigateway`)
- Provisions an HTTP API, stages, routes, integrations, and permissions for the Lambda functions you pass in.
- Allows toggling API Gateway creation via `create_apigateway` to support Lambda-only deployments.
- Outputs API identifiers plus the invoke URL for use in application code or automation.

> The README lists high-level module locations; this section contains the deeper contract and therefore lives here without duplication elsewhere.

## Environment Strategy

- `environments/local.tfvars`, `dev.tfvars`, and `prod.tfvars` each describe the Lambda functions and API routes for that specific environment.
- Backends are configured separately (if using S3/DynamoDB) so state does not leak between environments.
- Locals (`locals.tf`) centralize naming, tagging, and feature flags such as `use_localstack`, ensuring consistent defaults regardless of tfvars content.

## Configuration Pattern

The snippet below illustrates how to define multiple functions and expose routes that the API Gateway module will wire automatically.

```hcl
lambda_functions = {
  example = {
    source_file = "../app/dist/example.zip"
    handler     = "index.handler"
    runtime     = "nodejs18.x"
    description = "Example Lambda"
    memory_size = 256
    timeout     = 20
    environment = {
      NODE_ENV  = "production"
      LOG_LEVEL = "info"
    }
    routes = [
      { method = "GET",  path = "/examples" },
      { method = "POST", path = "/examples" }
    ]
  }

  auth = {
    source_file = "../app/dist/auth.zip"
    handler     = "index.handler"
    runtime     = "nodejs18.x"
    description = "Authentication Lambda function"
    memory_size = 128
    timeout     = 10
    environment = {
      JWT_SECRET = "replace-me"
    }
    routes = [
      { method = "POST", path = "/auth/login" }
    ]
  }
}
```

## Advanced Capabilities

- **Multi-region deployments** – Leverage provider aliases inside modules to deploy the same stack in multiple AWS regions.
- **Remote state backends** – Configure `backend.tf` with S3/DynamoDB to share state in teams and enable locking.
- **Custom modules** – Add directories under `modules/` for cross-cutting concerns such as databases, storage, monitoring, or security appliances and compose them from `main.tf`.

## Security & Operations

- IAM policies follow least-privilege defaults; extend them in `iam.tf` or a dedicated module when new services are introduced.
- Separate environments prevent accidental cross-talk; no shared resources or state files.
- Secrets should be injected via AWS Secrets Manager or Parameter Store references rather than plaintext tfvars.
- CloudWatch logging is enabled with configurable retention and API Gateway logging supports request/response tracing.

## Roadmap & Enhancements

1. **CI/CD** – Automate Terraform plan/apply with GitHub Actions or similar.
2. **Terratest** – Add infrastructure tests for module contracts.
3. **Additional modules** – Database, storage, and security modules to complement the Lambda/API surface.
4. **Documentation tooling** – Generate module documentation via `terraform-docs` to keep inputs/outputs in sync.

## Contributing Guidelines

- Maintain type-safe variables and meaningful defaults.
- Expose outputs for every resource another stack might consume.
- Update both this guide and the README when adding new modules or workflows so operations and architecture remain aligned.
