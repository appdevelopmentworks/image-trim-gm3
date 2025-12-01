import JSZip from 'jszip';

/**
 * Triggers the download of multiple blob files as a single ZIP archive.
 * 
 * @param blobs - An array of Blob objects to download.
 * @param fileNames - An array of corresponding file names for the blobs.
 */
export async function downloadBlobs(blobs: Blob[], fileNames: string[]): Promise<void> {
  if (blobs.length !== fileNames.length) {
    console.error("The number of blobs and file names must be the same.");
    return;
  }

  const zip = new JSZip();

  blobs.forEach((blob, index) => {
    zip.file(fileNames[index], blob);
  });

  try {
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = "processed_images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate ZIP file:", error);
    throw error;
  }
}
