# Terraform Infrastructure - Modular Architecture

This Terraform configuration uses a highly scalable, modular architecture designed for enterprise-level applications. The infrastructure supports multiple environments and follows best practices for maintainability and reusability.

## 🏗️ Architecture Overview

### File Structure
```
terraform/
├── main.tf              # Main entry point and module orchestration
├── versions.tf          # Terraform and provider version constraints
├── providers.tf         # AWS provider configuration
├── variables.tf         # Input variable definitions
├── locals.tf           # Local values and computed configurations
├── outputs.tf          # Output values
├── iam.tf              # IAM roles and policies
├── lambda.tf           # Lambda resources (can be replaced by modules)
├── apigateway.tf       # API Gateway resources (can be replaced by modules)
├── environments/       # Environment-specific configurations
│   ├── local.tfvars    # Local development with LocalStack
│   ├── dev.tfvars      # Development environment
│   └── prod.tfvars     # Production environment
└── modules/            # Reusable Terraform modules
    ├── lambda/         # Lambda function module
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    └── apigateway/     # API Gateway module
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

## 🚀 Features

### 1. Modular Design
- **Separation of Concerns**: Each service (Lambda, API Gateway, IAM) is isolated
- **Reusable Modules**: Common patterns can be shared across projects
- **Environment Isolation**: Different configurations for local, dev, and prod

### 2. Scalability
- **Multi-Environment Support**: Easy deployment to different environments
- **Dynamic Configuration**: Lambda functions and routes defined declaratively
- **Flexible Resource Management**: Easy to add/remove services

### 3. Best Practices
- **Consistent Tagging**: All resources tagged with project and environment
- **Proper Dependencies**: Resources depend on prerequisites
- **Security**: IAM roles with least privilege
- **Monitoring**: CloudWatch logs with configurable retention

## 📋 Usage

### Quick Start
```bash
# Initialize Terraform
terraform init

# Plan with local environment
terraform plan -var-file="environments/local.tfvars"

# Apply local configuration
terraform apply -var-file="environments/local.tfvars"
```

### Environment-Specific Deployment
```bash
# Development
terraform apply -var-file="environments/dev.tfvars"

# Production
terraform apply -var-file="environments/prod.tfvars"
```

### Using Workspaces (Recommended)
```bash
# Create and switch to environment workspace
terraform workspace new dev
terraform workspace select dev

# Deploy to specific environment
terraform apply -var-file="environments/dev.tfvars"
```

## 🔧 Configuration

### Lambda Functions
Define Lambda functions in your `.tfvars` file:

```hcl
lambda_functions = {
  api = {
    source_file = "../app/dist/api.zip"
    handler     = "index.handler"
    runtime     = "nodejs18.x"
    description = "Main API Lambda function"
    memory_size = 256
    timeout     = 30
    environment = {
      NODE_ENV = "production"
      LOG_LEVEL = "info"
    }
    routes = [
      {
        method = "GET"
        path   = "/users"
      },
      {
        method = "POST"
        path   = "/users"
      }
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
      JWT_SECRET = "your-secret-key"
    }
    routes = [
      {
        method = "POST"
        path   = "/auth/login"
      }
    ]
  }
}
```

## 📁 Migration from Monolithic Structure

The architecture supports both approaches:

### Option 1: Full Module Usage (Recommended)
- Use the `modules/` directory for all resources
- Keep `main.tf` clean and focused on orchestration
- Move inline resources to dedicated modules

### Option 2: Hybrid Approach (Current)
- Keep some resources inline (iam.tf, lambda.tf, apigateway.tf)
- Use modules for complex or reusable components
- Gradually migrate to full module usage

### Option 3: Gradual Migration
1. Start with inline resources (current state)
2. Extract common patterns into modules
3. Refactor main.tf to use modules
4. Clean up inline resource files

## 🌟 Advanced Features

### 1. Multi-Region Support
```hcl
# In providers.tf
provider "aws" {
  alias  = "us_west_2"
  region = "us-west-2"
}

# Use in modules
module "lambda_west" {
  source = "./modules/lambda"
  providers = {
    aws = aws.us_west_2
  }
  # ... other configuration
}
```

### 2. Backend Configuration
```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "dnd/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
```

### 3. Custom Modules
Create application-specific modules:
```
modules/
├── database/       # RDS/DynamoDB module
├── storage/        # S3 bucket module
├── monitoring/     # CloudWatch/X-Ray module
└── security/       # WAF/Shield module
```

## 🔒 Security Considerations

1. **IAM Roles**: Each service has minimal required permissions
2. **Environment Isolation**: No shared resources between environments
3. **Secrets Management**: Use AWS Secrets Manager or Parameter Store
4. **Network Security**: Consider VPC and security groups for production

## 📊 Monitoring and Logging

- **CloudWatch Logs**: Automatic log groups with configurable retention
- **API Gateway Logging**: Detailed request/response logging
- **Lambda Metrics**: Built-in CloudWatch metrics
- **Tagging Strategy**: Consistent tagging for cost allocation

## 🚀 Future Enhancements

1. **Service Discovery**: Add support for service mesh
2. **Auto Scaling**: Implement Lambda concurrency controls
3. **CI/CD Integration**: GitLab/GitHub Actions workflows
4. **Testing**: Terratest integration for infrastructure testing
5. **Documentation**: Terraform docs generation

## 🤝 Contributing

1. Follow the established module structure
2. Add proper variable descriptions and types
3. Include outputs for important resources
4. Test with multiple environments
5. Update documentation

This architecture provides a solid foundation for growth while maintaining simplicity and developer experience.