# shin-nihon-tec-web

株式会社 新ニホンテックのコーポレートサイト。
Astro + Tailwind CSS で構築し、Cloudflare Pages でホスティング。

---

## 技術スタック

| 項目 | 内容 |
| :--- | :--- |
| フレームワーク | [Astro](https://astro.build/) v6 |
| CSSフレームワーク | [Tailwind CSS](https://tailwindcss.com/) v4（`@tailwindcss/vite`） |
| CMS | [microCMS](https://microcms.io/)（`microcms-js-sdk` v3） |
| ホスティング | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Node.js | >= 22.12.0 |

---

## ブランチ構成

```
main        ← 公開用（本番環境）
  ↑ 問題なければマージ
test        ← テスト用（Staging環境）
  ↑ 機能完成したらマージ
develop     ← 開発用（日々の作業）
```

| ブランチ | 用途 |
| :--- | :--- |
| `main` | 本番公開用。このブランチへのマージが本番反映のトリガー |
| `test` | ステージング確認用。動作確認後に main へマージ |
| `develop` | 日々の開発作業ブランチ |

> 上記とは別に、先行開発しているものの公開が遅い関係で、以下の2ブランチを切りっぱなしにしている。

| ブランチ | 用途 |
| :--- | :--- |
| `add/live-view` | ライブビュー機能の追加 |
| `add/work-page` | 実績ページの追加 |

---

## 自動デプロイ

以下のいずれかをトリガーに Cloudflare Pages が自動ビルド・デプロイされる。

- **GitHub `main` ブランチへのマージ** → Webhook で Cloudflare Pages をビルド
- **microCMS のコンテンツ更新** → Webhook で Cloudflare Pages をビルド

---

## ローカル開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（http://localhost:4321）
npm run dev

# 本番ビルド
npm run build

# ビルド後のプレビュー
npm run preview
```

---

## バージョン管理

リリースごとに git タグを付与して管理。詳細な変更履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

```bash
# タグ一覧
git tag --sort=-version:refname

# タグ間のコード差分を確認
git diff v1.0.0 v1.1.0

# タグ間のコミット一覧を確認（1行表示）
git log v1.0.0..v1.1.0 --oneline
```

---

## ディレクトリ構成

```
/
├── public/
│   └── assets/
│       ├── images/          # 画像ファイル
│       ├── special_images/  # 特設・イベント用画像
│       └── *.js             # クライアントサイドJS（event.js / events-list.js 等）
├── src/
│   ├── components/          # 各セクションのAstroコンポーネント
│   ├── layouts/             # 共通レイアウト
│   ├── library/             # microCMSクライアント等
│   ├── pages/               # ルーティング（.astroファイル）
│   │   └── events/          # イベント一覧・詳細ページ
│   └── styles/              # CSSファイル（common.css / gallery.css / top.css）
├── astro.config.mjs
└── package.json
```
