import { Upload, X, FileText, Plus, RotateCcw } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

interface FileProps {
  title: string;
  onSelectFile: (key: string, value: File, index?: number) => void;
  side: "left" | "right";
  removeSelectedFile: (key: "left" | "right", index: number) => void;
  selectedFiles: File[];
  className?: string;
}

interface UploadedFile {
  name: string;
  preview: string;
  file: File;
}

const MAX_FILES = 4;

export default function FileUpload({
  title,
  onSelectFile,
  side,
  removeSelectedFile,
  selectedFiles,
  className = "",
}: FileProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync uploaded files with selected files from parent
  useEffect(() => {
    if (!selectedFiles || selectedFiles.length === 0) {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      setUploadedFiles([]);
      return;
    }

    const newUploadedFiles: UploadedFile[] = [];

    selectedFiles.forEach((file) => {
      const existingFile = uploadedFiles.find((f) => f.name === file.name);
      if (existingFile) {
        newUploadedFiles.push(existingFile);
      } else {
        newUploadedFiles.push({
          name: file.name,
          preview: URL.createObjectURL(file),
          file,
        });
      }
    });

    uploadedFiles.forEach((file) => {
      if (!newUploadedFiles.some((f) => f.preview === file.preview)) {
        URL.revokeObjectURL(file.preview);
      }
    });

    setUploadedFiles(newUploadedFiles);
  }, [selectedFiles]);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  const validateAndProcessFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const validFiles: File[] = [];
      const invalidFiles: string[] = [];

      Array.from(files).forEach((file) => {
        if (
          file.type === "text/csv" ||
          file.name.toLowerCase().endsWith(".csv")
        ) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      });

      if (invalidFiles.length > 0) {
        alert(
          `Oops! These files aren't CSV format: ${invalidFiles.join(
            ", "
          )}. Please select CSV files only. 📊`
        );
      }

      validFiles.forEach((file) => {
        onSelectFile(side, file);
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [side, onSelectFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      validateAndProcessFiles(files);
    },
    [validateAndProcessFiles]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateAndProcessFiles(e.target.files);
    },
    [validateAndProcessFiles]
  );

  const handleUploadClick = useCallback(() => {
    if (uploadedFiles.length < MAX_FILES) {
      fileInputRef.current?.click();
    }
  }, [uploadedFiles.length]);

  const handleRemoveFile = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      removeSelectedFile(side, index);
    },
    [side, removeSelectedFile]
  );

  const handleReplaceFile = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      removeSelectedFile(side, index);
      setTimeout(() => handleUploadClick(), 100);
    },
    [side, removeSelectedFile, handleUploadClick]
  );

  const canUploadMore = uploadedFiles.length < MAX_FILES;
  const hasFiles = uploadedFiles.length > 0;

  return (
    <div className="w-full max-w-md overflow-hidden relative mx-auto">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3 min-w-0">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <div className="flex items-center space-x-1 text-xs flex-shrink-0">
          <div className="bg-gray-300 text-black px-2 py-1 rounded-full text-xs font-medium">
            CSV
          </div>
          <span className="text-gray-500">
            {uploadedFiles.length}/{MAX_FILES}
          </span>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative rounded-xl border border-dashed transition-all duration-300 ease-in-out mb-3 overflow-hidden
          ${
            isDragOver
              ? "border-gray-300 bg-blue-50 scale-[1.02] shadow-lg"
              : canUploadMore
              ? "border-gray-300 hover:border-gray-300 hover:bg-gray-50/50"
              : "border-gray-200 bg-gray-50"
          }
          ${canUploadMore ? "cursor-pointer" : "cursor-not-allowed"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={canUploadMore ? handleUploadClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept=".csv,text/csv"
          onChange={handleFileInputChange}
          disabled={!canUploadMore}
        />

        <div className="p-4 text-center min-w-0">
          {canUploadMore ? (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gradient-to-br bg-gray-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-800 mb-1 truncate">
                Drop CSV files here
              </h4>
              <p className="text-xs text-gray-600 mb-2 truncate">
                or click to browse
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <FileText className="w-3 h-3" />
                <span>Max {MAX_FILES} files</span>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-gray-300 rounded-xl">
                <Upload className="w-6 h-6 text-gray-500" />
              </div>
              <h4 className="text-sm font-medium text-gray-600 mb-1 truncate">
                Maximum files reached
              </h4>
              <p className="text-xs text-gray-500 truncate">
                Remove files to upload new ones
              </p>
            </>
          )}
        </div>
      </div>

      {/* Files List - Fixed positioning and z-index */}
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden relative z-10">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center">
              <FileText className="w-4 h-4 mr-1 text-gray-600" />
              Files
            </h4>
          </div>
        </div>

        <div
          className="p-3 relative"
          style={{
            maxHeight: uploadedFiles.length > 3 ? "240px" : "auto",
            // Ensure it stays within bounds
            position: "relative",
            zIndex: 1,
          }}
        >
          {hasFiles ? (
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="group flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 relative"
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0 overflow-hidden">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                        <FileText className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p
                        className="text-xs font-medium text-gray-900 truncate"
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {(file.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 relative z-20">
                    <button
                      type="button"
                      className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-black bg-blue-50 rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
                      onClick={(e) => handleReplaceFile(e, index)}
                      aria-label={`Replace ${file.name}`}
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-6 h-6 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors flex-shrink-0"
                      onClick={(e) => handleRemoveFile(e, index)}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <h5 className="text-sm font-medium text-gray-600 mb-1">
                No files uploaded
              </h5>
              <p className="text-xs text-gray-500 mb-3">
                Upload your first CSV file
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
