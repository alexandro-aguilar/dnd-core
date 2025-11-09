# DND Terraform - Modular Architecture

This project implements a highly scalable, modular Terraform architecture for AWS Lambda and API Gateway deployment.

## 🏗️ Architecture Overview

The infrastructure is organized into several layers:

### File Structure
```
terraform/
├── main.tf              # Main orchestration file
├── versions.tf          # Terraform and provider versions
├── providers.tf         # AWS provider configuration
├── variables.tf         # Input variables
├── locals.tf           # Local values and computed data
├── outputs.tf          # Output values
├── iam.tf              # IAM roles and policies
├── lambda.tf           # Lambda functions (inline)
├── apigateway.tf       # API Gateway resources (inline)
├── environments/       # Environment-specific configurations
│   ├── local.tfvars
│   ├── dev.tfvars
│   └── prod.tfvars
└── modules/            # Reusable modules
    ├── lambda/         # Lambda module
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    └── apigateway/     # API Gateway module
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

### Design Principles

1. **Modularity**: Components are split into logical, reusable modules
2. **Environment Separation**: Each environment has its own variable file
3. **DRY Principle**: Common configurations are centralized in locals
4. **Scalability**: Easy to add new Lambda functions and routes
5. **Maintainability**: Clear separation of concerns

## 🚀 Quick Start

### Prerequisites
- Terraform >= 1.5.0
- Node.js and Yarn
- Docker (for LocalStack)

### Commands

#### Build and Deploy
```bash
# Build Lambda code and deploy to local environment
yarn deploy:local

# Deploy to development environment
yarn deploy:dev

# Deploy to production environment
yarn deploy:prod
```

#### Terraform Operations
```bash
# Initialize Terraform
yarn tf:init

# Plan changes for specific environment
yarn tf:plan:local
yarn tf:plan:dev
yarn tf:plan:prod

# Apply changes
yarn tf:apply:local
yarn tf:apply:dev
yarn tf:apply:prod

# Destroy infrastructure
yarn teardown:local
yarn teardown:dev
yarn teardown:prod
```

#### Development Tools
```bash
# Format and validate Terraform
yarn check:terraform

# View outputs
yarn tf:output

# List Terraform state
yarn tf:state:list
```

## 📁 Module Documentation

### Lambda Module
Located in `modules/lambda/`

**Purpose**: Manages Lambda functions and their CloudWatch log groups.

**Inputs**:
- `name_prefix`: Resource naming prefix
- `lambda_configs`: Map of Lambda function configurations
- `lambda_exec_role_arn`: IAM role ARN for Lambda execution
- `log_retention_in_days`: CloudWatch log retention period
- `common_tags`: Tags to apply to all resources

**Outputs**:
- `lambda_functions`: Map of created Lambda function objects
- `lambda_function_arns`: Map of Lambda function ARNs
- `lambda_function_invoke_arns`: Map of Lambda invoke ARNs
- `lambda_function_names`: Map of Lambda function names

### API Gateway Module
Located in `modules/apigateway/`

**Purpose**: Manages API Gateway HTTP API, integrations, routes, and permissions.

**Inputs**:
- `name_prefix`: Resource naming prefix
- `lambda_functions`: Map of Lambda function objects
- `api_routes`: Map of API route configurations
- `create_apigateway`: Boolean to enable/disable API Gateway
- `log_retention_in_days`: CloudWatch log retention period
- `common_tags`: Tags to apply to all resources

**Outputs**:
- `api_gateway_id`: API Gateway ID
- `api_gateway_arn`: API Gateway ARN
- `api_gateway_execution_arn`: API Gateway execution ARN
- `api_gateway_endpoint`: API Gateway invoke URL
- `stage_invoke_url`: Complete stage URL

## Layout

- `main.tf` & `variables.tf`: Provider, IAM, Lambda, and API Gateway resources.
- `outputs.tf`: Frequently used values such as the HTTP API endpoint.
- `terraform.tfvars.example`: Sample configuration that wires two Lambda routes.

## Usage

1. Copy and edit `terraform.tfvars.example` → `terraform.tfvars`.
2. (Local only) Start LocalStack: `localstack start` or `SERVICES=lambda,apigateway localstack start`.
3. Initialise and apply:

   ```bash
   terraform -chdir=terraform init
   terraform -chdir=terraform apply
   ```

4. Invoke routes via the printed `http_api_endpoint` output.

## LocalStack tips

- Keep `use_localstack = true` (default) for local runs. Set it to `false` when targeting AWS.
- Ensure LocalStack exposes the services listed in `localstack_endpoints` (lambda, apigateway/apigatewayv2, iam, sts, logs, cloudwatch, s3).
- LocalStack uses dummy credentials; Terraform injects `test`/`test` automatically.

## Adding Lambdas

Extend the `lambda_functions` map with entries that define:

- `source_file`: Relative path to the JavaScript file that exports the handler (e.g., `../app/.bin/health/index.js`). Terraform inlines this file directly, so no manual zipping is needed.
- `handler`: Runtime entry point (defaults to `index.handler`).
- `runtime`: AWS Lambda runtime (defaults to `nodejs18.x`).
- `routes`: Optional list of `{ method, path }` objects to mount on the shared HTTP API.

Every function automatically receives CloudWatch log groups, IAM execution roles (with the AWS managed basic policy), and API Gateway permissions when routes are defined.
