import { ImageItem, ExportSettings } from '../types';

/**
 * Processes a single image using the Canvas API to crop and resize it.
 * @param imageItem - The image to process.
 * @param settings - The export settings.
 * @returns A promise that resolves with the processed blob.
 */
function processSingleImage(imageItem: ImageItem, settings: ExportSettings): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!imageItem.originalWidth || !imageItem.originalHeight) {
      return reject(new Error(`Original dimensions for ${imageItem.file.name} are not available.`));
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = settings.targetWidth;
      canvas.height = settings.targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Failed to get canvas context.'));
      }

      // Default to center-crop logic, but account for zoom.
      const sourceAspectRatio = img.naturalWidth / img.naturalHeight;
      const targetAspectRatio = settings.targetWidth / settings.targetHeight;

      let sw = img.naturalWidth;
      let sh = img.naturalHeight;

      if (sourceAspectRatio > targetAspectRatio) {
        sw = img.naturalHeight * targetAspectRatio;
      } else if (sourceAspectRatio < targetAspectRatio) {
        sh = img.naturalWidth / targetAspectRatio;
      }
      
      // Apply zoom
      const zoom = imageItem.zoom || 1;
      const zoomedSw = sw / zoom;
      const zoomedSh = sh / zoom;

      // sx and sy are the top-left corner of the crop box.
      // Start with a centered crop box, then adjust for user's pan (imageItem.crop)
      let sx = (img.naturalWidth - zoomedSw) / 2 + (imageItem.crop?.x || 0);
      let sy = (img.naturalHeight - zoomedSh) / 2 + (imageItem.crop?.y || 0);

      // Ensure the crop area doesn't go out of bounds
      sx = Math.max(0, Math.min(sx, img.naturalWidth - zoomedSw));
      sy = Math.max(0, Math.min(sy, img.naturalHeight - zoomedSh));

      ctx.drawImage(img, sx, sy, zoomedSw, zoomedSh, 0, 0, settings.targetWidth, settings.targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to Blob conversion failed.'));
          }
        },
        settings.format,
        settings.quality
      );
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageItem.file.name}`));
    };
    img.src = imageItem.previewUrl;
  });
}


/**
 * Processes all images based on the provided global settings.
 * 
 * @param images - The array of ImageItem objects to process.
 * @param settings - The export settings to apply to all images.
 * @returns A promise that resolves with an array of processed blobs.
 */
export async function processImages(
  images: ImageItem[],
  settings: ExportSettings
): Promise<Blob[]> {
  console.log('Processing images with settings:', { images, settings });

  const processingPromises = images.map(image => processSingleImage(image, settings));
  
  return Promise.all(processingPromises);
}
