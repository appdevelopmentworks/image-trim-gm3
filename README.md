# Image Resizer for Creators

デジカメ写真やイラストを、WEBサイトやSNSなどの用途に合わせて最適なサイズ・アスペクト比に一括変換するデスクトップ＆ウェブアプリケーションです。

## 概要

このアプリケーションは、Next.jsとElectronを使用しており、単一のコードベースからWebアプリとデスクトップアプリ（Windows, macOS）の両方をビルドできます。画像処理はすべてクライアントサイドで完結するため、プライバシーが保護され、サーバーコストもかかりません。

## 主な機能

-   **複数画像のアップロード:** ドラッグ＆ドロップまたはファイル選択で画像を簡単に追加。
-   **リサイズプリセット:** SNS、ブログ、ウェブサイトなど一般的な用途に合わせた画像サイズをワンクリックで適用。
-   **カスタムサイズ指定:** 幅と高さを自由に設定可能。
-   **インタラクティブな切り抜き:** 各画像の切り抜き範囲を直感的に調整。
-   **複数フォーマット出力:** JPG, PNG, WebP形式での保存に対応。
-   **一括ダウンロード:** 処理後の画像はZIPファイルとしてまとめてダウンロード。

## 技術スタック

-   **Framework:** Next.js (App Router)
-   **Desktop Wrapper:** Electron
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Image Processing:** HTML5 Canvas API

## 開発環境のセットアップ

### 前提条件

-   [Node.js](https://nodejs.org/) (v18.17.0 or later)
-   [pnpm](https://pnpm.io/installation) (推奨)

### インストール

1.  リポジトリをクローンします:
    ```bash
    git clone <repository-url>
    cd image-trim-gm3
    ```

2.  依存関係をインストールします:
    ```bash
    pnpm install
    ```

## アプリケーションの起動

### Webアプリとして起動

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` を開いてください。

### デスクトップアプリとして起動

```bash
pnpm dev:electron
```

Electronウィンドウが起動します。

## ビルド

### Webアプリのビルド

```bash
pnpm build
```

### デスクトップアプリのビルド

```bash
# for Windows
pnpm build:electron:win

# for macOS
pnpm build:electron:mac
```
