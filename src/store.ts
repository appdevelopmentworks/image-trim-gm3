import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, ImageItem, ExportSettings } from './types';
import { v4 as uuidv4 } from 'uuid';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      images: [],
      globalSettings: {
        targetWidth: 1200,
        targetHeight: 800,
        keepAspectRatio: false,
        format: 'image/jpeg',
        quality: 0.9,
        fitMode: 'cover',
      },
      isDragging: false,
      editingImageId: null,

      addImages: (files: File[]) => {
        const newImages: ImageItem[] = files.map((file) => ({
          id: uuidv4(),
          file,
          previewUrl: URL.createObjectURL(file),
          originalWidth: 0,
          originalHeight: 0,
          crop: { x: 0, y: 0 },
          zoom: 1,
          status: 'idle',
        }));

        // Load image dimensions
        newImages.forEach(image => {
          const img = new Image();
          img.onload = () => {
            set(state => ({
              images: state.images.map(item => item.id === image.id ? { ...item, originalWidth: img.width, originalHeight: img.height } : item)
            }));
          };
          img.src = image.previewUrl;
        });

        set((state) => ({
          images: [...state.images, ...newImages],
        }));
      },

      removeImage: (id: string) =>
        set((state) => ({
          images: state.images.filter((image) => {
            if (image.id === id) {
              URL.revokeObjectURL(image.previewUrl);
            }
            return image.id !== id;
          }),
        })),

      updateGlobalSettings: (settings: Partial<ExportSettings>) =>
        set((state) => ({
          globalSettings: { ...state.globalSettings, ...settings },
        })),

      updateImageCrop: (id: string, crop: { x: number; y: number }, zoom: number) =>
        set((state) => ({
          images: state.images.map((image) =>
            image.id === id ? { ...image, crop, zoom } : image
          ),
        })),

      setEditingImageId: (id: string | null) => set({ editingImageId: id }),
      setIsDragging: (isDragging: boolean) => set({ isDragging }),
    }),
    {
      name: 'image-trim-settings',
      partialize: (state) => ({ globalSettings: state.globalSettings }),
    }
  )
);
