import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FileUploadRowProps {
  rowNumber: number;
  onFileSelect?: (file: File) => void;
}

export const FileUploadRow: React.FC<FileUploadRowProps> = ({
  rowNumber,
  onFileSelect,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
      // Simulate upload progress
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);
  };

  const handleRemove = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-3 pb-4 border-b border-border/40 last:border-b-0 last:pb-0">
      {/* Row Header */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          File {rowNumber}
        </label>
        {file && (
          <span className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </span>
        )}
      </div>

      {/* File Input Area */}
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative flex items-center justify-center w-full h-20 border-2 border-dashed border-border/50 rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="*"
          />
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* File Name */}
          <div className="flex items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {isUploading ? "Uploading" : "Complete"}
              </span>
              <span className="text-xs font-semibold text-blue-500">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadRow;
