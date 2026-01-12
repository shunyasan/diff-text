# このファイルを実行するには実行権限が必要

PORT=3000 # nextのport
PID=$(lsof -t -i:$PORT)

if [ -n "$PID" ]; then
  echo "すでに起動しています"
  exit;
fi

cd "$(dirname "$0")"
npm install
npm run dev