# Environment Configuration

This directory contains environment-specific Terraform variable configurations organized by environment.

## 📁 **Structure**

```
environments/
├── terraform.tfvars.example    # Template with documentation
├── local/                      # LocalStack development
│   ├── aws-common.tfvars      # AWS/LocalStack settings
│   └── environment.tfvars     # Local-specific Lambda configs
├── dev/                       # AWS development
│   ├── aws-common.tfvars      # AWS settings
│   └── environment.tfvars     # Dev-specific Lambda configs
├── staging/                   # AWS staging
│   ├── aws-common.tfvars      # AWS settings
│   └── environment.tfvars     # Staging-specific Lambda configs
└── prod/                      # AWS production
    ├── aws-common.tfvars      # AWS settings
    └── environment.tfvars     # Prod-specific Lambda configs
```

## 🚀 **Usage**

Each environment directory contains all the configuration needed for that environment:

### Local Development (LocalStack)
```bash
terraform plan \
  -var-file=environments/local/aws-common.tfvars \
  -var-file=environments/local/environment.tfvars

terraform apply \
  -var-file=environments/local/aws-common.tfvars \
  -var-file=environments/local/environment.tfvars \
  -auto-approve
```

### Development (AWS)
```bash
terraform plan \
  -var-file=environments/dev/aws-common.tfvars \
  -var-file=environments/dev/environment.tfvars

terraform apply \
  -var-file=environments/dev/aws-common.tfvars \
  -var-file=environments/dev/environment.tfvars \
  -auto-approve
```

### Staging (AWS)
```bash
terraform plan \
  -var-file=environments/staging/aws-common.tfvars \
  -var-file=environments/staging/environment.tfvars

terraform apply \
  -var-file=environments/staging/aws-common.tfvars \
  -var-file=environments/staging/environment.tfvars \
  -auto-approve
```

### Production (AWS)
```bash
terraform plan \
  -var-file=environments/prod/aws-common.tfvars \
  -var-file=environments/prod/environment.tfvars

terraform apply \
  -var-file=environments/prod/aws-common.tfvars \
  -var-file=environments/prod/environment.tfvars \
  -auto-approve
```

## 📋 **File Descriptions**

### `aws-common.tfvars`
Contains AWS-specific settings:
- AWS region
- LocalStack endpoints (for local environment)
- Infrastructure settings

### `environment.tfvars`
Contains environment-specific configurations:
- Project name and environment
- Log retention settings
- Lambda function definitions with environment-specific:
  - Memory allocations
  - Timeouts
  - Environment variables
  - Descriptions

## 🔧 **Environment Differences**

| Setting | Local | Dev | Staging | Prod |
|---------|--------|-----|---------|------|
| **Memory** | 128 MB | 256 MB | 384 MB | 512 MB |
| **Timeout** | 10s | 30s | 20s | 15s |
| **Logs** | 1 day | 7 days | 14 days | 30 days |
| **LOG_LEVEL** | debug | info | info | warn |
| **Provider** | LocalStack | AWS | AWS | AWS |

## ➕ **Adding New Environments**

1. Create a new directory: `environments/uat/`
2. Copy files from an existing environment
3. Modify the values for the new environment
4. Update your deployment scripts to include the new environment

## ➕ **Adding New Lambda Functions**

Add the function to all environment.tfvars files with appropriate settings for each environment.