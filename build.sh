#!/bin/sh

cd $TRAVIS_BUILD_DIR/site
yarn install

cd $TRAVIS_BUILD_DIR
docker-compose --version

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
eval $(aws ecr get-login --region us-west-2) #needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY envvars
docker-compose pull
docker-compose build
docker-compose push

# You will want this for logging. If one of your containers does not build for
# whatever reason it's best to report that now before your tests start
# otherwise it can be really tricky to debug why tests are failing sometimes.
docker ps
