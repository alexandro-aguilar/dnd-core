# Terraform Command Examples for Node.js Scripts
# Updated for environment-specific folder structure

# For your Node.js deployment scripts, use these commands:

## Local Development
terraform plan \
  -var-file=environments/local/aws-common.tfvars \
  -var-file=environments/local/environment.tfvars

terraform apply \
  -var-file=environments/local/aws-common.tfvars \
  -var-file=environments/local/environment.tfvars \
  -auto-approve

## Development Environment
terraform plan \
  -var-file=environments/dev/aws-common.tfvars \
  -var-file=environments/dev/environment.tfvars

terraform apply \
  -var-file=environments/dev/aws-common.tfvars \
  -var-file=environments/dev/environment.tfvars \
  -auto-approve

## Production Environment
terraform plan \
  -var-file=environments/prod/aws-common.tfvars \
  -var-file=environments/prod/environment.tfvars

terraform apply \
  -var-file=environments/prod/aws-common.tfvars \
  -var-file=environments/prod/environment.tfvars \
  -auto-approve

# Simplified approach: Use all .tfvars files in environment directory
# Note: This works with shell glob expansion
terraform plan -var-file=environments/local/*.tfvars
terraform apply -var-file=environments/local/*.tfvars -auto-approve