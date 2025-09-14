import React, { useRef, useState } from 'react';

interface FileUploadProps {
  id: string;
  label: string;
  onFileUpload: (content: string) => void;
  fileType: '.csv' | '.json';
  fileCount?: number;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ id, label, onFileUpload, fileType, fileCount, description }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(content);
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const isUploaded = fileCount !== undefined && fileCount > 0;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-lg font-semibold text-gray-200 mb-2">{label}</label>
      <p className="text-sm text-gray-400 mb-3">{description}</p>
      <input
        type="file"
        id={id}
        accept={fileType}
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-md transition-colors duration-200 ${
          isUploaded
            ? 'border-green-500 bg-green-900/30 hover:bg-green-800/40'
            : 'border-gray-600 hover:border-cyan-500 hover:bg-gray-700/50'
        }`}
      >
        <div className="text-center">
          {isUploaded ? (
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold text-green-300">{`Loaded ${fileCount} ${fileType === '.csv' ? 'Games' : 'Entries'}`}</span>
            </div>
          ) : (
             <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-gray-300">Choose a {fileType} file</span>
            </div>
          )}
          {fileName && <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{fileName}</p>}
        </div>
      </button>
    </div>
  );
};

export default FileUpload;
