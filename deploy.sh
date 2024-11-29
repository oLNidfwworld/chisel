export PATH=/root/.local/share/pnpm:/root/.nvm/versions/node/v22.11.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

npx pnpm install --frozen-lockfile
npx pnpm run build
pm2 restart Chisel