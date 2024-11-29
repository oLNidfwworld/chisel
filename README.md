## Setup 

```bash  
# pnpm
node -v 
# 22.5.1 or 20 ( old v18.17.1 )
pnpm install 
# or 
pnpm install --frozen-lockfile
pnpm run dev
pnpm run build
```

## For CI/CD:

- fill secrets.FTP_SERVER, vars.FTP_PATH, secrets.FTP_USERNAME, secrets.FTP_PASSWORD
- git pull your projet at vars.FTP_PATH
- install node with lts
  ```bash 
  nvm install --lts > for current date 22.11.0 is lts
  ```
- setup pm2
  ```bash
  npm install pm2 -g
  pm2 start your-filename.config.js
  ```
- add deploy key
  ```bash
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```
  optional
  ```bash 
  $ eval "$(ssh-agent -s)"
  > Agent pid 59566
  ssh-add ~/.ssh/id_ed25519
  ```
- Setup nginx (certbot, domain etc)
- be happy with ur project =)

# CI/CD TODO:

- May use docker instead?

## In TODO:

- non existing prop value bug (example : ?house-type=woob-stone-[kekkeelleel])
- REMOVE DUPLICATING REQUESTS
- minor style fixes
- minor style animations
- minor refac
- preview filtering object number on button "Показать"
- return ETextarea
 
