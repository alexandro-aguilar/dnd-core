#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: scripts/createCognitoUser.sh --username <username> --email <email> --password <password> --user-pool-id <pool-id> [--region us-east-1] [--endpoint-url http://localhost:4566] [--env-file .env]
The script can also read values from environment variables (COGNITO_USERNAME, COGNITO_EMAIL, COGNITO_PASSWORD, COGNITO_USER_POOL_ID, AWS_REGION, COGNITO_ENDPOINT) or a dotenv file.
EOF
}

USERNAME=""
EMAIL=""
PASSWORD=""
USER_POOL_ID=""
REGION="${AWS_REGION:-us-east-1}"
ENDPOINT_URL=""
ENV_FILE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --username) USERNAME="$2"; shift 2 ;;
    --email) EMAIL="$2"; shift 2 ;;
    --password) PASSWORD="$2"; shift 2 ;;
    --user-pool-id) USER_POOL_ID="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --endpoint-url) ENDPOINT_URL="$2"; shift 2 ;;
    --env-file) ENV_FILE="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

if [[ -z "$ENV_FILE" && -f ".env" ]]; then
  ENV_FILE=".env"
fi

if [[ -n "$ENV_FILE" ]]; then
  if [[ ! -f "$ENV_FILE" ]]; then
    echo "Env file not found: $ENV_FILE" >&2
    exit 1
  fi
  # shellcheck source=/dev/null
  set -a
  source "$ENV_FILE"
  set +a
fi
echo "Set vars"
# fallback to env vars if flags not provided
USERNAME="${USERNAME:-${COGNITO_USERNAME:-}}"
EMAIL="${EMAIL:-${COGNITO_EMAIL:-}}"
PASSWORD="${PASSWORD:-${COGNITO_PASSWORD:-}}"
USER_POOL_ID="${USER_POOL_ID:-${COGNITO_USER_POOL_ID:-}}"
REGION="${REGION:-${AWS_REGION:-us-east-1}}"
ENDPOINT_URL="${ENDPOINT_URL:-${COGNITO_ENDPOINT:-}}"

if [[ -z "$USERNAME" || -z "$EMAIL" || -z "$PASSWORD" || -z "$USER_POOL_ID" ]]; then
  echo "Missing required arguments." >&2
  usage
  exit 1
fi

AWS_ARGS=(--region "$REGION")
if [[ -n "$ENDPOINT_URL" ]]; then
  AWS_ARGS+=(--endpoint-url "$ENDPOINT_URL")
fi

echo "Creating Cognito user '$USERNAME' in pool '$USER_POOL_ID'...'$ENDPOINT_URL' '$REGION'"
awslocal cognito-idp admin-create-user \
  --user-pool-id "$USER_POOL_ID" \
  --username "$USERNAME" \
  --user-attributes Name=email,Value="$EMAIL" Name=email_verified,Value=true \
  --message-action SUPPRESS \
  --temporary-password "$PASSWORD" \
  "${AWS_ARGS[@]}"

echo "Setting permanent password..."
awslocal cognito-idp admin-set-user-password \
  --user-pool-id "$USER_POOL_ID" \
  --username "$USERNAME" \
  --password "$PASSWORD" \
  --permanent \
  "${AWS_ARGS[@]}"

echo "User created."
