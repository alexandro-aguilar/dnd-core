# DND Terraform Infrastructure

Modular Terraform configuration that provisions AWS Lambda and API Gateway stacks with the same layout for local (LocalStack), dev, and prod environments.

## Documentation Map

- `README.md` (this file) → workflow, commands, and day-to-day usage.
- `ARCHITECTURE.md` → deep dive into the module structure, environment strategy, and advanced patterns.

## Repository Layout

```
terraform/
├── main.tf              # Entry point and module orchestration
├── versions.tf          # Terraform and provider versions
├── providers.tf         # AWS provider configuration
├── variables.tf         # Shared inputs
├── locals.tf            # Derived config and tagging rules
├── outputs.tf           # Frequently consumed outputs
├── iam.tf / lambda.tf / apigateway.tf   # Inline resources for hybrid deployments
├── environments/        # Environment-specific tfvars
└── modules/             # Reusable Lambda + API Gateway building blocks
```

See `ARCHITECTURE.md` for a description of the module boundaries and when to use each file.

## Prerequisites

- Terraform ≥ 1.5.0
- Node.js + Yarn (build Lambda bundles)
- Docker running LocalStack for local deployments

## Workflow

### Build + Deploy helpers

```bash
# Build Lambda bundle then apply the local stack
yarn deploy:local

# Deploy AWS dev/prod
yarn deploy:dev
yarn deploy:prod
```

### Terraform commands

```bash
# Initialize the working directory
yarn tf:init

# Plan/apply per environment
yarn tf:plan:local
yarn tf:plan:dev
yarn tf:plan:prod
yarn tf:apply:local
yarn tf:apply:dev
yarn tf:apply:prod

# Destroy an environment
yarn teardown:local
yarn teardown:dev
yarn teardown:prod
```

### Utilities

```bash
yarn check:terraform   # fmt + validate
yarn tf:output         # show outputs
yarn tf:state:list     # list tracked resources
```

## Usage

1. Choose the tfvars file for your target environment (see `environments/*.tfvars`) and tailor Lambda definitions, API routes, and tags to your needs.
2. For local development ensure LocalStack is running: `localstack start` or `SERVICES=lambda,apigateway localstack start`.
3. Initialise and apply from the repo root (scripts above) or manually:

   ```bash
   terraform -chdir=terraform init
   terraform -chdir=terraform apply
   ```

4. Invoke HTTP routes using the `http_api_endpoint` output.

## Modules at a Glance

- `modules/lambda`: Creates Lambda functions, log groups, and exposes ARNs/names for downstream consumers.
- `modules/apigateway`: Provisions HTTP APIs, stages, integrations, and permissions for the Lambdas you enable.

Inputs/outputs for each module, environment patterns, and future enhancements live in `ARCHITECTURE.md`.

## LocalStack Tips

- Keep `use_localstack = true` for local runs; set `false` when targeting AWS accounts.
- Ensure LocalStack exposes all services listed under `localstack_endpoints` (lambda, apigateway/apigatewayv2, iam, sts, logs, cloudwatch, s3).
- LocalStack uses dummy credentials; Terraform injects `test`/`test` automatically.

## Adding Lambdas

Extend the `lambda_functions` map with entries that define:

- `source_file`: Relative path to the JavaScript file that exports the handler (e.g., `../app/.bin/health/index.js`). Terraform inlines this file directly, so no manual zipping is needed.
- `handler`: Runtime entry point (defaults to `index.handler`).
- `runtime`: AWS Lambda runtime (defaults to `nodejs20.x`).
- `routes`: Optional list of `{ method, path }` objects to mount on the shared HTTP API.

Every function automatically receives CloudWatch log groups, IAM execution roles (with the AWS managed basic policy), and API Gateway permissions when routes are defined.
