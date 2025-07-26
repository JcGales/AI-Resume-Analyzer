import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full p-0.5 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900">
            <div
                {...getRootProps()}
                className={`w-full p-8 border-2 border-dashed rounded-lg transition-all ${
                    isDragActive ? 'border-gray-600 bg-gray-900' : 'border-gray-700 bg-gray-800'
                }`}
            >
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer flex flex-col items-center justify-center">
                    {file ? (
                        <div
                            className="w-full flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src="public/assets/images/pdf.png"
                                    alt="pdf"
                                    className="w-10 h-10 filter invert"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-200 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="p-2 cursor-pointer hover:bg-gray-700 rounded-full transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <img
                                    src="public/assets/icons/cross.svg"
                                    alt="remove"
                                    className="w-4 h-4 filter invert opacity-70 hover:opacity-100"
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img
                                    src='public/assets/icons/info.svg'
                                    alt="upload"
                                    className="w-20 h-20 filter invert opacity-80"
                                />
                            </div>
                            <p className="text-lg text-gray-300">
                <span className="font-semibold text-white">
                  Click to upload
                </span>{' '}
                                or drag and drop
                            </p>
                            <p className="text-lg text-gray-400">
                                PDF (max {formatSize(maxFileSize)})
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader