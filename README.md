# Image Resizer for Creators (Image Trim GM3)

デジカメ写真やイラストを、WEBサイトやSNSなどの用途に合わせて最適なサイズ・アスペクト比に一括変換するデスクトップアプリケーションです。

## 概要

このアプリケーションは、ElectronとReactを使用しており、WindowsおよびmacOSで動作します。画像処理はすべてクライアントサイド（Canvas API）で完結するため、プライバシーが保護され、高速に処理されます。

## 主な機能

-   **複数画像のアップロード:** ドラッグ＆ドロップまたはファイル選択で画像を簡単に追加。
-   **SNSプリセット:** Instagram, X (Twitter), Facebook, YouTube などの推奨サイズをワンクリックで適用。
-   **リサイズモード:**
    -   **Crop to Fill:** 指定サイズに合わせて中央を切り抜き。
    -   **Fit to Size:** アスペクト比を維持したまま指定サイズ内に収める。
-   **カスタムサイズ指定:** 幅と高さを自由に設定可能。
-   **インタラクティブな編集:** 各画像の切り抜き位置やズーム倍率を個別に調整可能。
-   **複数フォーマット出力:** JPG, PNG, WebP形式での保存に対応。品質設定も可能。
-   **一括ダウンロード:** 処理後の画像はZIPファイルとしてまとめてダウンロード。
-   **多言語対応:** 日本語と英語に対応。

## 技術スタック

-   **Runtime:** Electron
-   **Framework:** React
-   **Language:** TypeScript
-   **Bundler:** esbuild
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **State Management:** Zustand
-   **Internationalization:** i18next

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

開発モードで起動します（ビルド + Electron起動）。

```bash
pnpm dev
# または
pnpm start
```

## パッケージング（ビルド）

配布用のインストーラー（Windows: .exe / macOS: .dmg）を作成します。

```bash
pnpm dist
```

生成されたファイルは `dist` または `release` ディレクトリに出力されます。
