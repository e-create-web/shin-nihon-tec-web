# shin-nihon-tec-web

株式会社 新ニホンテックのコーポレートサイト。
Astro + Tailwind CSS で構築し、Cloudflare Pages でホスティング。

- **本番サイト**: https://www.shinnihontec.co.jp/
- **Cloudflare Pages URL**: https://shin-nihon-tec-web-dzk.pages.dev

---

## ドキュメント

| ドキュメント | 内容 |
| :--- | :--- |
| [docs/styles.md](docs/styles.md) | スタイル設計ガイド（共通クラス・命名規約・カラートークン） |
| [docs/microcms.md](docs/microcms.md) | microCMS スキーマ（`events` エンドポイント・タグの扱い・運用メモ） |
| [CHANGELOG.md](CHANGELOG.md) | バージョンごとの変更履歴 |
| [ROADMAP.md](ROADMAP.md) | 今後の機能追加・改善の予定 |

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

### ブランチ命名規則

作業ブランチは `プレフィックス/内容` の形式で命名する。

| プレフィックス | 役割・使うタイミング | 例 |
| :--- | :--- | :--- |
| `add/` | 新機能の追加、新ページ作成、ファイルの新規追加 | `add/about-page`, `add/contact-form` |
| `fix/` | バグや表示崩れの修正、エラーの解消 | `fix/header-layout`, `fix/typo-in-footer` |
| `update/` | 既存デザインの変更、テキスト差し替え、仕様の更新 | `update/button-color`, `update/profile-text` |
| `refactor/` | 見た目・機能を変えずにコードを整理・改善する | `refactor/split-sections`, `refactor/clean-up-css` |

**命名のコツ**
- すべて小文字（`Add/Page` ではなく `add/page`）
- 単語区切りはハイフン `-`（`add/about_page` ではなく `add/about-page`）
- 日本語ではなく簡単な英語（ターミナルで打ちやすいため）

---

## 自動デプロイ

以下のいずれかをトリガーに Cloudflare Pages が自動ビルド・デプロイされる。

- **GitHub `main` ブランチへのマージ** → Webhook で Cloudflare Pages をビルド
- **microCMS のコンテンツ更新** → Webhook で Cloudflare Pages をビルド

---

## 環境変数

microCMS への接続に以下の環境変数が必要。[`.env.example`](.env.example) をコピーして `.env` を作成し、値を設定する（`.env` は Git 管理外）。

```bash
cp .env.example .env
```

```bash
# .env
MICROCMS_SERVICE_DOMAIN=xxxxxxxx   # microCMS のサービスドメイン
MICROCMS_API_KEY=xxxxxxxxxxxxxxxx  # microCMS の API キー
```

> 本番（Cloudflare Pages）では、同じ変数をダッシュボードの環境変数に設定する。
> 参照箇所: [src/library/microcms.ts](src/library/microcms.ts)

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

# Astro CLI（astro add / astro check など）を実行
npm run astro -- --help
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

> Astro は `src/pages/` 内の `.astro` / `.md` ファイルを、ファイル名に基づいて自動でルーティングする。

---

## 参考リンク

- [Astro ドキュメント](https://docs.astro.build/) / [Discord](https://astro.build/chat)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [microCMS ドキュメント](https://document.microcms.io/)
- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
