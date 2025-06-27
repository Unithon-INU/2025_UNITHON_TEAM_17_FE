import { ChangeEvent, useState } from "react";

export function usePreviewImage(initialFile: File | null) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onFileSet = (file: File | null) => {
    setFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  }

  return {
    file,
    onFileChange,
    previewUrl,
    onFileSet,
  };
}