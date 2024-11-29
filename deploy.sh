source ~/.bashrc

npx pnpm install --frozen-lockfile
npx pnpm run build
pm2 restart Chisel