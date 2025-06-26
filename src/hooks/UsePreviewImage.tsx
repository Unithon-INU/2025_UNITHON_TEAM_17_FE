import {ChangeEvent, useState} from "react";

export function usePreviewImage(initialFile: File | null) {
    const [file, setFile] = useState<File | null>(initialFile);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    return [file, onFileChange, previewUrl];
}