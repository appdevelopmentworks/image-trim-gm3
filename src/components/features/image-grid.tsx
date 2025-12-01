import React from "react";
import { useStore } from "../../store";
import { ImageCard } from "./image-card";

export function ImageGrid() {
  const { images } = useStore();

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
