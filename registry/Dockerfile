FROM amazonlinux:latest

RUN yum clean all
RUN yum install -y wget

RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
RUN wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
RUN yum update -y
RUN yum install -y nodejs
RUN yum install -y yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN yarn install

COPY . /usr/src/app

EXPOSE 8081
CMD [ "node", "index.js" ]