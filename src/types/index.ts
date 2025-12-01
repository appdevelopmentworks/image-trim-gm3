// 画像の処理ステータス
export type ProcessStatus = 'idle' | 'processing' | 'completed' | 'error';

// ユーザーが設定可能な画像サイズ・形式
export interface ExportSettings {
  targetWidth: number;     // 出力する幅 (px)
  targetHeight: number;    // 出力する高さ (px)
  keepAspectRatio: boolean;// アスペクト比を維持するか (基本false: 指定サイズにクロップするため)
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  quality: number;         // 0.1 ~ 1.0 (jpeg/webpのみ)
  fitMode: 'cover' | 'contain'; // cover=切り抜き, contain=余白追加(V2で検討)
}

// アプリ内で管理する個別の画像データ
export interface ImageItem {
  id: string;              // UUID
  file: File;              // 元のファイルオブジェクト
  previewUrl: string;      // 表示用のObjectURL
  originalWidth: number;
  originalHeight: number;

  // 個別のクロップ設定 (react-easy-crop用)
  crop: { x: number; y: number };
  zoom: number;

  status: ProcessStatus;
}

// アプリケーション全体のステート
export interface AppState {
  images: ImageItem[];
  globalSettings: ExportSettings; // 全体共通の設定
  isDragging: boolean;            // ドラッグオーバー中か
  editingImageId: string | null;  // 編集中の画像ID

  // Actions
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  updateGlobalSettings: (settings: Partial<ExportSettings>) => void;
  updateImageCrop: (id: string, crop: { x: number, y: number }, zoom: number) => void;
  setEditingImageId: (id: string | null) => void;
  setIsDragging: (isDragging: boolean) => void;
}
