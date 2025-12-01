# 開発進捗ロードマップ

このドキュメントは、`requirements.md` と `tech_spec.md` に基づいて具体的な開発タスクを分割し、進捗を追跡するためのものです。

## フェーズ1: プロジェクト基盤の構築 (完了済み)

-   [x] **React + Electron プロジェクトの初期化**
    -   [x] `npm init` でプロジェクトを作成
    -   [x] `esbuild` でのビルド設定
    -   [x] TypeScript, Tailwind CSS の設定
-   [x] **UIライブラリの導入**
    -   [x] `shadcn/ui` のセットアップ (`components.json` の作成)
    -   [ ] `lucide-react` (アイコン) の導入
-   [x] **ディレクトリ構成の整備**
    -   [x] `src`, `dist`, `docs` 等のフォルダを作成
-   [x] **Electron の導入**
    -   [x] `electron` を `devDependencies` に追加
    -   [x] `main.js`, `preload.js` を作成
    -   [x] `package.json` に `start`, `build` スクリプトを追加
-   [x] **型定義の作成**
    -   [x] `src/types/index.ts` に基本的な型を定義

## フェーズ2: UIコンポーネントの実装

-   [ ] **基本レイアウトの構築**
    -   [ ] `src/App.tsx` に `ThemeProvider` を設定
    -   [ ] ヘッダーコンポーネント (`components/layout/header.tsx`)
    -   [ ] サイドバーコンポーネント (`components/layout/sidebar.tsx`)
    -   [ ] メインコンテンツエリアのレイアウトを `App.tsx` に実装
-   [ ] **画像入力機能のUI**
    -   [ ] ファイルドロップゾーン (`features/dropzone.tsx`)
-   [ ] **画像表示機能のUI**
    -   [ ] 画像プレビューグリッド (`features/image-grid.tsx`)
    -   [ ] 個別画像カード (`features/image-card.tsx`)
-   [ ] **設定パネルのUI**
    -   [ ] プリセット選択 (`Select`)
    -   [ ] 幅・高さ入力 (`Input`)
    -   [ ] 出力フォーマット選択 (`RadioGroup` or `Select`)
    -   [ ] 品質スライダー (`Slider`)
    -   [ ] 保存ボタン (`Button`)
-   [ ] **画像編集機能のUI**
    -   [ ] 画像クロップ用モーダル (`features/crop-modal.tsx`)
    -   [ ] `react-easy-crop` を組み込み、アスペクト比を固定したクロップエリアを表示

## フェーズ3: コアロジックの実装

-   [ ] **状態管理**
    -   [ ] `ImageItem`, `ExportSettings` 等の型定義 (`types/index.ts`)
    -   [ ] Zustand または React Hooks で `AppState` を管理するストア/カスタムフックを作成
-   [ ] **画像処理ロジック (`lib/image-process.ts`)**
    -   [ ] ファイルオブジェクトから画像情報を読み込む関数
    -   [ ] `react-easy-crop` の出力 (crop, zoom) を元に Canvas で画像を切り抜く関数
    -   [ ] 指定フォーマット (`image/jpeg`, `image/png`, `image/webp`) に変換して Blob を返す関数
-   [ ] **ファイル操作ロジック**
    -   [ ] `jszip` を使って複数の Blob を ZIP 圧縮する関数
    -   [ ] `file-saver` を使って単一 Blob または ZIP Blob をダウンロードさせる関数

## フェーズ4: 機能の統合と仕上げ

-   [ ] **UIとロジックの結合**
    -   [ ] ドロップゾーンで読み込んだファイルを状態管理に追加
    -   [ ] 設定パネルの変更が `globalSettings` ステートに反映されるようにする
    -   [ ] 画像カードの編集ボタンでクロップモーダルを開き、対象画像の情報を渡す
    -   [ ] クロップモーダルでの変更が対象の `ImageItem` ステートに反映されるようにする
    -   [ ] 保存ボタンクリックで、全画像の処理を実行し、ダウンロードを開始する
-   [ ] **UXの向上**
    -   [ ] ドラッグ＆ドロップ中のオーバーレイ表示
    -   [ ] 画像処理中のスピナーやプログレスバー表示
    -   [ ] エラーハンドリングとフィードバック (例: 対応していないファイル形式)

## フェーズ5: Electronビルドとテスト

-   [ ] **ビルド設定の最終調整**
    -   [ ] `electron-builder` の設定ファイル (`electron-builder.json5` or `package.json`内) を構成
    -   [ ] アプリアイコンの設定
-   [ ] **ビルドと動作確認**
    -   [ ] Windows (.exe) でのビルドと動作確認
    -   [ ] macOS (.dmg) でのビルドと動作確認 (環境があれば)
-   [ ] **最終テスト**
    -   [ ] Web版とデスクトップ版で一通りの機能が問題なく動作することを確認
