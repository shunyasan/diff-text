# 1. xcode を install

```
# xcodeのインストーラーが立ち上がるので同意
xcode-select --install
```

`Command line tools are already installed.`という出力の場合は次へ

# 2. node を install

```
# nvmをダウンロードしてインストールする：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# シェルを再起動する代わりに実行する
\. "$HOME/.nvm/nvm.sh"

# Node.jsをダウンロードしてインストールする：
nvm install 24

# Node.jsのバージョンを確認する：
node -v # "v24.12.0"が表示される。

# npmのバージョンを確認する：
npm -v # "11.6.2"が表示される。
```

# 3. package を install

```
npm i
```

# 4. 起動

```
npm run dev
```

# 5. local にアクセス

http://localhost:3000/
