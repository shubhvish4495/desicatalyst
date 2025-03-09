#!/bin/bash
export NODE_ENV=production
npm run build
cp -r server/data dist/data
cp attached_assets/logo-fullsize.png dist/public/logo-fullsize.png
echo "Setup complete, Now Deploying..."
nohup node dist/index.js &
echo "Deployment made. Tailing nohup.out"
tail -f nohup.out