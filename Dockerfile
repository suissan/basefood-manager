FROM ghcr.io/puppeteer/puppeteer:22.13.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    LOGIN_URL=https://shop.basefood.co.jp/account/login \
    REGISTER_MAIL_ADDRESS=suiMox7.sg@gmail.com \
    REGISTER_PASSWORD=u6e67u958b \
    TARGET_URL=https://shop.basefood.co.jp/mypage/subscription

WORKDIR /user/src/app

COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
CMD ["node", "./bin/www"]