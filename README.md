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

# 3. PATH を入れる

```
vi ~/.zshrc
```

エディターが開いたら以下を貼り付け

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

esc キーを押してから:wq を入力して enter キー

表示が戻ったら、以下を実行

```
source ~/.zshrc
```

# 4. brew install

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install後に表示される「NextStep」も実行する
```

# 5. tool をインストール

```
# docxの解析
brew install --cask libreoffice

# pdfのdecript
brew install qpdf
```

# 6. 起動

権限を以下に変更する

```
chmod 744 start.command
```

start.command をクリックする

# 7. local にアクセス

http://localhost:3000/

表示されない場合は起動の手順を再実行
