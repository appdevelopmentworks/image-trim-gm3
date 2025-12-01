import React from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { processImages } from "../../lib/image-processor";
import { downloadBlobs } from "../../lib/downloader";
import { ExportSettings } from "../../types";
import { Settings2, Download, Image as ImageIcon, Maximize2, FileType, Sliders } from "lucide-react";

const getNewFileName = (originalName: string, format: ExportSettings['format']) => {
  const name = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  const extension = format.split('/')[1];
  return `${name}.${extension}`;
};

export function Sidebar() {
  const { t } = useTranslation();
  const { globalSettings, updateGlobalSettings, images } = useStore();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleProcess = async () => {
    if (images.length === 0) {
      toast.error(t('sidebar.no_images', { defaultValue: 'No images to process' }));
      return;
    }
    setIsProcessing(true);
    try {
      const blobs = await processImages(images, globalSettings);
      const fileNames = images.map(image => getNewFileName(image.file.name, globalSettings.format));
      await downloadBlobs(blobs, fileNames);
      toast.success(t('sidebar.processing_complete', { defaultValue: 'Processing complete!' }));
    } catch (error) {
      console.error("Image processing failed:", error);
      toast.error(t('sidebar.processing_failed', { defaultValue: 'Processing failed.' }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <aside className="w-80 border-r bg-card/50 backdrop-blur-sm flex flex-col h-full transition-all duration-300">
      <div className="p-6 border-b bg-card">
        <div className="flex items-center gap-2 text-primary">
          <Settings2 className="w-5 h-5" />
          <h2 className="text-lg font-semibold tracking-tight">{t("sidebar.settings")}</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {t("sidebar.description")}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Dimensions Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <Maximize2 className="w-4 h-4" />
            <span>{t("sidebar.dimensions")}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width" className="text-xs text-muted-foreground">{t("sidebar.width")}</Label>
              <div className="relative">
                <Input
                  id="width"
                  type="number"
                  className="pr-8 font-mono"
                  value={globalSettings.targetWidth}
                  onChange={(e) =>
                    updateGlobalSettings({
                      targetWidth: parseInt(e.target.value) || 0,
                    })
                  }
                  disabled={isProcessing}
                />
                <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">px</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height" className="text-xs text-muted-foreground">{t("sidebar.height")}</Label>
              <div className="relative">
                <Input
                  id="height"
                  type="number"
                  className="pr-8 font-mono"
                  value={globalSettings.targetHeight}
                  onChange={(e) =>
                    updateGlobalSettings({
                      targetHeight: parseInt(e.target.value) || 0,
                    })
                  }
                  disabled={isProcessing}
                />
                <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Format Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <FileType className="w-4 h-4" />
            <span>{t("sidebar.format_quality")}</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="format" className="text-xs text-muted-foreground">{t("sidebar.format")}</Label>
              <Select
                value={globalSettings.format}
                onValueChange={(value) =>
                  updateGlobalSettings({
                    format: value as "image/jpeg" | "image/png" | "image/webp",
                  })
                }
                disabled={isProcessing}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("sidebar.format_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image/jpeg">JPEG</SelectItem>
                  <SelectItem value="image/png">PNG</SelectItem>
                  <SelectItem value="image/webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="quality" className="text-xs text-muted-foreground">{t("sidebar.quality")}</Label>
                <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">
                  {Math.round(globalSettings.quality * 100)}%
                </span>
              </div>
              <Slider
                id="quality"
                min={0}
                max={1}
                step={0.01}
                value={[globalSettings.quality]}
                onValueChange={(value) =>
                  updateGlobalSettings({ quality: value[0] })
                }
                disabled={globalSettings.format === 'image/png' || isProcessing}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t bg-card/50">
        <Button
          className="w-full h-12 text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
          size="lg"
          onClick={handleProcess}
          disabled={isProcessing || images.length === 0}
        >
          {isProcessing ? (
            <>
              <Sliders className="mr-2 h-4 w-4 animate-spin" />
              {t("sidebar.processing")}
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              {t("sidebar.process_images")}
            </>
          )}
        </Button>
        <p className="text-[10px] text-center text-muted-foreground mt-3">
          {t("sidebar.images_ready", { count: images.length })}
        </p>
      </div>
    </aside>
  );
}