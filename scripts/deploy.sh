#!/bin/bash

set -xe

ENV_FILE=$1

if [ ! -f $ENV_FILE ]; then
  echo "No such configuration file '$ENV_FILE'"
  exit 1
fi


# this line give us the ability to use the environment variables
# that exist in dev.ini,stg.ini,prd.ini
source $ENV_FILE

# The following source extracts these variables

# * CLOUDFRONT_DISTRIBUTION
# * CLOUDFRONT_DOMAIN
# * S3_BUCKET
# * AWS_REGION
# * ENVIRONMENT


# build the bundled file that will be exist in dist folder
yarn build

##
# Upload to S3
##

aws s3 cp ./build/ s3://$S3_BUCKET \
  --recursive \
  --acl public-read \

##
# Invalidate CloudFront cache
##

aws configure set preview.cloudfront true
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRIBUTION \
  --invalidation-batch file://scripts/invalidation.json \

