FROM node:18-alpine

# Install wget, vim, rsync
RUN apk update && apk add --no-cache wget vim rsync

WORKDIR /app

# Copy the rest of the application files
COPY . .

RUN npm install --omit=dev

RUN rsync /app/component/AppConfig/AppConfigStg.js /app/component/AppConfig/ApiSetting.js

RUN npm run build

CMD ["npm", "start"]

