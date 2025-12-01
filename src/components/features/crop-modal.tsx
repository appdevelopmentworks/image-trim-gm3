import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Cropper from "react-easy-crop";
import { useStore } from "../../store";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export function CropModal() {
  const { t } = useTranslation();
  const { editingImageId, setEditingImageId, images, updateImageCrop, globalSettings } = useStore();

  const imageToEdit = images.find(img => img.id === editingImageId);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Initialize state when image opens
  React.useEffect(() => {
    if (imageToEdit) {
      setCrop(imageToEdit.crop || { x: 0, y: 0 });
      setZoom(imageToEdit.zoom || 1);
    }
  }, [imageToEdit]);

  const onCropChange = useCallback((location: { x: number; y: number }) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const handleSave = () => {
    if (imageToEdit) {
      updateImageCrop(imageToEdit.id, crop, zoom);
      setEditingImageId(null);
    }
  };

  if (!imageToEdit) {
    return null;
  }

  // Aspect ratio from global settings
  const aspect = globalSettings.targetWidth / globalSettings.targetHeight;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">{t('crop_modal.title')}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t('crop_modal.description')}
          </p>
        </div>

        <div className="relative flex-grow min-h-[400px] bg-secondary/20 overflow-hidden">
          <Cropper
            image={imageToEdit.previewUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            showGrid={true}
            objectFit="contain"
            style={{
              containerStyle: { background: 'transparent' },
              mediaStyle: {}
            }}
          />
        </div>

        <div className="p-6 border-t space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-12">Zoom</span>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-8 text-right">{zoom.toFixed(1)}x</span>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingImageId(null)}>
              {t('crop_modal.cancel')}
            </Button>
            <Button onClick={handleSave}>
              {t('crop_modal.save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
