#!/bin/sh

cd $TRAVIS_BUILD_DIR/site
yarn install

cd $TRAVIS_BUILD_DIR
#sudo apt-get update
#sudo apt-get install -o Dpkg::Options::="--force-confold" --force-yes -y docker-engine
  
# Print out the current docker-compose version. Once this reports 1.6+ then we
# do not need the following steps.
docker-compose --version

# As of the writing of this script Travis has docker-compose v1.4.2, we need
# to update it to 1.8+. $DOCKER_COMPOSE_VERSION is provide from the `env`
# above.
#sudo rm /usr/local/bin/docker-compose
#curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > docker-compose
#chmod +x docker-compose
#sudo mv docker-compose /usr/local/bin

# Check that docker-compose is now running the latest version (or at least the
# one we specified). This is not to be confused with the version we printed
# before doing the update.
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
