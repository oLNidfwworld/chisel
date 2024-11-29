export PATH=/root/.local/share/pnpm:/root/.nvm/versions/node/v22.11.0/bin

npx pnpm install --frozen-lockfile
npx pnpm run build
pm2 restart Chisel