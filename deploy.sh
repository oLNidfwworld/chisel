export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh  
export PATH=/root/.nvm/versions/node/v18.17.1/bin/npm
export /root/.nvm/versions/node/v18.17.1/bin/pm2

npx pnpm install --frozen-lockfile
npx pnpm run build
pm2 restart Chisel