ARG MAINTAINER
FROM node:20
MAINTAINER $MAINTAINER

WORKDIR /root/app

COPY . /root/app/

# RUN npm install pm2 -g --registry=https://registry.npmmirror.com
RUN npm install --registry=https://registry.npmmirror.com


ENV PORT=3721
ENV NODE_ENV=production

EXPOSE 3721

# CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
CMD [ "npm", "start" ]