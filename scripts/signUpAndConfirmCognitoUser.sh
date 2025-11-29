#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: scripts/signUpAndConfirmCognitoUser.sh --username <username> --email <email> --password <password> --user-pool-id <pool-id> --client-id <client-id> [--region us-east-1] [--endpoint-url http://localhost:4566] [--env-file .env]
The script signs up a user and confirms them so the Cognito PostConfirmation trigger (syncUserOnSignup) fires.
Values can come from flags, a dotenv file, or env vars (COGNITO_USERNAME, COGNITO_EMAIL, COGNITO_PASSWORD, COGNITO_USER_POOL_ID, COGNITO_USER_POOL_CLIENT_ID, AWS_REGION, COGNITO_ENDPOINT, AWS_CLI).
CLI selection:
  - Defaults to aws.
  - If --endpoint-url/COGNITO_ENDPOINT is set and AWS_CLI is not, it falls back to awslocal.
  - You can force either via AWS_CLI (e.g., AWS_CLI=aws or AWS_CLI=awslocal).
EOF
}

USERNAME=""
EMAIL=""
PASSWORD=""
USER_POOL_ID=""
CLIENT_ID=""
REGION="${AWS_REGION:-us-east-1}"
ENDPOINT_URL=""
ENV_FILE=""
AWS_CLI_BIN="${AWS_CLI:-}"
STAGE="${STAGE:-}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --username) USERNAME="$2"; shift 2 ;;
    --email) EMAIL="$2"; shift 2 ;;
    --password) PASSWORD="$2"; shift 2 ;;
    --user-pool-id) USER_POOL_ID="$2"; shift 2 ;;
    --client-id) CLIENT_ID="$2"; shift 2 ;;
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

# fallback to env vars if flags not provided
USERNAME="${USERNAME:-${COGNITO_USERNAME:-}}"
EMAIL="${EMAIL:-${COGNITO_EMAIL:-}}"
PASSWORD="${PASSWORD:-${COGNITO_PASSWORD:-}}"
USER_POOL_ID="${USER_POOL_ID:-${COGNITO_USER_POOL_ID:-}}"
CLIENT_ID="${CLIENT_ID:-${COGNITO_USER_POOL_CLIENT_ID:-}}"
REGION="${REGION:-${AWS_REGION:-us-east-1}}"
ENDPOINT_URL="${ENDPOINT_URL:-${COGNITO_ENDPOINT:-}}"
AWS_CLI_BIN="${AWS_CLI_BIN:-${AWS_CLI:-awslocal}}"
STAGE="${STAGE:-${STAGE:-}}"

# Default CLI: prefer aws for real AWS, awslocal when hitting a local endpoint (unless overridden)
if [[ -z "$AWS_CLI_BIN" ]]; then
  if [[ -n "$ENDPOINT_URL" || "$STAGE" == "local" ]]; then
    AWS_CLI_BIN="awslocal"
  else
    AWS_CLI_BIN="aws"
  fi
fi

AWS_ARGS=(--region "$REGION")
if [[ -n "$ENDPOINT_URL" ]]; then
  AWS_ARGS+=(--endpoint-url "$ENDPOINT_URL")
fi

if [[ -z "$USERNAME" || -z "$EMAIL" || -z "$PASSWORD" || -z "$USER_POOL_ID" || (-z "$CLIENT_ID" && "$STAGE" != "local") ]]; then
  echo "Missing required arguments." >&2
  usage
  exit 1
fi

# When running locally we can derive the client id if it wasn't provided.
if [[ "$STAGE" == "local" && -z "$CLIENT_ID" ]]; then
  echo "Attempting to discover Cognito app client for pool '$USER_POOL_ID'..."
  CLIENT_ID=$("$AWS_CLI_BIN" cognito-idp list-user-pool-clients \
    --user-pool-id "$USER_POOL_ID" \
    --max-results 5 \
    "${AWS_ARGS[@]}" | jq -r '.UserPoolClients[0].ClientId // empty')
  if [[ -z "$CLIENT_ID" ]]; then
    echo "Could not discover a Cognito app client for pool '$USER_POOL_ID'. Please pass --client-id or set COGNITO_USER_POOL_CLIENT_ID." >&2
    exit 1
  fi
fi

echo "Signing up Cognito user '$USERNAME' in client '$CLIENT_ID'..."
"$AWS_CLI_BIN" cognito-idp sign-up \
  --client-id "$CLIENT_ID" \
  --username "$USERNAME" \
  --password "$PASSWORD" \
  --user-attributes Name=email,Value="$EMAIL" Name=name,Value="$USERNAME" \
  "${AWS_ARGS[@]}"

echo "Confirming user in pool '$USER_POOL_ID' to trigger PostConfirmation..."
"$AWS_CLI_BIN" cognito-idp admin-confirm-sign-up \
  --user-pool-id "$USER_POOL_ID" \
  --username "$USERNAME" \
  "${AWS_ARGS[@]}"

echo "User signed up and confirmed. PostConfirmation trigger should have executed."
