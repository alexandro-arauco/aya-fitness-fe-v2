import { Upload, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

interface FileProps {
  title: string;
  onSelectFile: (key: string, value: File, index?: number) => void;
  side: "left" | "right";
  removeSelectedFile: (key: "left" | "right", index: number) => void;
  selectedFiles: File[];
}

interface UploadedFile {
  name: string;
  preview: string;
  file: File;
}

const MAX_FILES = 4;

export default function FileAssessment({
  title,
  onSelectFile,
  side,
  removeSelectedFile,
  selectedFiles,
}: FileProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync uploaded files with selected files from parent
  useEffect(() => {
    if (!selectedFiles || selectedFiles.length === 0) {
      // Clean up object URLs to prevent memory leaks
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

    // Clean up old object URLs
    uploadedFiles.forEach((file) => {
      if (!newUploadedFiles.some((f) => f.preview === file.preview)) {
        URL.revokeObjectURL(file.preview);
      }
    });

    setUploadedFiles(newUploadedFiles);
  }, [selectedFiles]);

  // Clean up object URLs on unmount
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

      // Show error for invalid files
      if (invalidFiles.length > 0) {
        alert(
          `Invalid file type(s): ${invalidFiles.join(
            ", "
          )}. Please upload CSV files only.`
        );
      }

      // Process valid files
      validFiles.forEach((file) => {
        onSelectFile(side, file);
      });

      // Reset input to allow re-uploading the same file
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

  const canUploadMore = uploadedFiles.length < MAX_FILES;

  return (
    <div className="w-full md:w-1/2">
      <label className="block text-sm font-bold mb-2">{title} CSV</label>

      <div
        className={`
          relative flex flex-col items-center justify-center rounded-md border-1 border-dashed p-6 transition-colors
          ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : canUploadMore
              ? "border-gray-300 hover:border-gray-400"
              : "border-gray-200"
          }
          ${canUploadMore ? "cursor-pointer" : "cursor-default"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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

        {uploadedFiles.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                    <span className="text-sm truncate" title={file.name}>
                      {file.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                    onClick={(e) => handleRemoveFile(e, index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {uploadedFiles.length}/{MAX_FILES} files uploaded
              </span>
              {canUploadMore && (
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Add more
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={handleUploadClick}
            >
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Click the icon above to upload CSV files
              </p>
              <p className="text-xs text-gray-500">
                or drag and drop files here
              </p>
              <p className="text-xs text-gray-400">
                Maximum {MAX_FILES} files allowed
              </p>
            </div>
          </div>
        )}

        {!canUploadMore && (
          <div className="absolute inset-0 bg-gray-50 bg-opacity-75 rounded-lg flex items-center justify-center">
            <p className="text-sm text-gray-500 font-medium">
              Maximum files reached ({MAX_FILES})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
