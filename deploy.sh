#!/usr/bin/env bash

: "${STACK_NAME:=$1}"

if [[ -z ${STACK_NAME} ]]; then
  echo "No Stackname is provided."
  echo "Use: deploy <STACK_NAME>"
  exit 2
fi

echo ${STACK_NAME}
aws cloudformation deploy --template-file template.yaml --stack-name=${STACK_NAME} --capabilities CAPABILITY_NAMED_IAM

echo "Updating UserPoolClient with attributes not available with Cloudformation"
USERPOOL_CLIENT_ID=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`UserPoolClientId`].OutputValue' --output text)
USERPOOL_ID=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`UserPoolId`].OutputValue' --output text)
IDENTITY_POOL_ID=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query 'Stacks[0].Outputs[?OutputKey==`IdentityPoolId`].OutputValue' --output text)
REGION=$(aws configure get region)
DOMAIN_NAME="ui-${USERPOOL_CLIENT_ID}"
echo "UserPoolId: ${USERPOOL_ID}, UserpoolClientId: ${USERPOOL_CLIENT_ID}"

aws cognito-idp update-user-pool-client --user-pool-id ${USERPOOL_ID} --client-id ${USERPOOL_CLIENT_ID} \
--supported-identity-providers 'COGNITO' \
--callback-urls '["http://localhost:4200/cognito-callback"]' \
--logout-urls '["http://localhost:4200"]' \
--allowed-o-auth-flows 'implicit' \
--allowed-o-auth-scopes 'aws.cognito.signin.user.admin' 'email' 'openid' 'phone'  'profile' \
--allowed-o-auth-flows-user-pool-client

aws cognito-idp delete-user-pool-domain --user-pool-id ${USERPOOL_ID} --domain ${DOMAIN_NAME} >/dev/null 2>&1
aws cognito-idp create-user-pool-domain --user-pool-id ${USERPOOL_ID} --domain ${DOMAIN_NAME}

echo "Writing environment File"
env_file=$(<src/environments/_environment.template)
env_file="${env_file//REGION/${REGION}}"
env_file="${env_file//IDENTITY_POOL_ID/${IDENTITY_POOL_ID}}"
env_file="${env_file//USER_POOL_ID/${USERPOOL_ID}}"
env_file="${env_file//CLIENT_ID/${USERPOOL_CLIENT_ID}}"
env_file="${env_file//DOMAIN_NAME/${DOMAIN_NAME}}"

echo "${env_file//REDIRECT_DOMAIN/http://localhost:4200}" > src/environments/environment.ts

