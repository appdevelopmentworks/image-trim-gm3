import React from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { ImageItem } from "../../types";
import { Button } from "../ui/button";
import { Crop, Trash2 } from "lucide-react";

interface ImageCardProps {
  image: ImageItem;
}

export function ImageCard({ image }: ImageCardProps) {
  const { t } = useTranslation();
  const { removeImage, setEditingImageId } = useStore();

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden bg-muted relative">
        {image.previewUrl ? (
          <img
            src={image.previewUrl}
            alt={image.file.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            No Preview
          </div>
        )}

        {/* Overlay actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setEditingImageId(image.id)}
            title={t('image_card.edit')}
          >
            <Crop className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeImage(image.id)}
            title={t('image_card.remove')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-medium" title={image.file.name}>
          {image.file.name}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {Math.round(image.file.size / 1024)} KB
        </p>
      </div>
    </div>
  );
}
