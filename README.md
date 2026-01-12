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

# 3. brew install

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install後に表示される「NextStep」も実行する
```

# 4. tool をインストール

```
# docxの解析
brew install --cask libreoffice

# pdfのdecript
brew install qpdf
```

# 5. 起動

```
cd ~/Program/diff-text
npm i
npm run dev
```

# 6. local にアクセス

http://localhost:3000/

表示されない場合は起動(手順 5) を再実行
