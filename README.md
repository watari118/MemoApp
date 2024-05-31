# ssh キー生成

ssh-keygen -t rsa -b 4096 -C"メールアドレス"

git remote add origin 〜は.git/config ファイルに [remote "origin"] の設定を追記するコマンド

git remote rm origin すると、.git/config ファイルの [remote "origin”] の設定が削除される。

[remote "origin"] の設定を削除後に git remote add origin 〜を実行すると、その設定が.git/config ファイルに追記される。

git remote リモートリポジトリの一覧を表示する。

ssh -T github.com で github の接続確認ができる。。

# ssh-agent を起動

eval "$(ssh-agent -s)"

# ssh-agent に SSH キーを追加して、キーチェーンにパスフレーズを保存

ssh-add または ssh-add ~/.ssh/任意のファイル

# ssh-agent を終了させる

ssh-agent -k

# 最初のプッシュのみ下記のコマンドを実行

git push -u origin master

# expo のインストール(3.28.5 のバージョン指定)

npm install -g expo-cli@3.28.5

# 利用できるエミュレーターを表示

emulator -list-avds

# エミュレーターを起動

emulator @Pixel_2_API_30

# エミュレーターがネットに接続できない場合

emulator @Pixel_2_API_30 -dns-server 8.8.8.8

# expo の新規作成

expo init --npm

# expo アプリの共有

expo publish

# ESlint のインストール　（--save-dev は package.json の devDependencies を意味）

npm install --save-dev eslint@7.13.0

# ESlint の初期設定

npx eslint --init

# アイコンの使用(https://icons.expo.fyi/)

npm install @expo/vector-icons

# Eslint のエラー箇所確認

npx eslint ./src/\*_/_.jsx

# React Hooks

・function Component でのみ使用できる
・主に use が付く機能が React Hooks にあたる（例、useState,useEffect など）
