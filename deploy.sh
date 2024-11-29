source ~/.nvm/nvm.sh

npx pnpm install --frozen-lockfile
npx pnpm run build
pm2 restart Chisel