import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import { Upload } from "lucide-react";

export function Dropzone() {
  const { t } = useTranslation();
  const { isDragging, addImages, setIsDragging } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addImages(Array.from(e.dataTransfer.files));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addImages(Array.from(e.target.files));
    }
    // Reset value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className={`group relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 overflow-hidden ${isDragging
        ? "border-primary bg-primary/5 scale-[1.02]"
        : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
        }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple
        accept="image/*"
      />
      <div className={`p-4 rounded-full bg-background shadow-sm ring-1 ring-border transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md ${isDragging ? "scale-110 shadow-md ring-primary/30" : ""}`}>
        <Upload className={`w-8 h-8 transition-colors duration-300 ${isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
      </div>
      <div className="space-y-2 z-10">
        <p className="text-lg font-semibold text-foreground/80 group-hover:text-primary transition-colors">
          {t('dropzone.prompt')}
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          {t('dropzone.description')}
        </p>
      </div>

      {/* Decorative background pattern could go here if we had one */}
    </div>
  );
}
