import React, {useState} from "react";
import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import accept from "attr-accept";
import {formatSize} from "~/lib/formatSize";

interface FileUploaderProps  {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader =({onFileSelect} : FileUploaderProps)=>{
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect])

    const maxFileSize =  20*1024*1024;
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple:false,
        accept: {'application/pdf':['.pdf']},
        maxFiles : maxFileSize,
    })

    const file  = acceptedFiles[0] || null;
    return(
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()}/>
             <div className="space-y-4 cursor-pointer">
                <div className="mx-auto w-16 h-16 flex items-center justify-center">
                    <img src="public/assets/public/icons/info.svg" alt="upload" className="size-20"/>
                </div>
                 {
                     file ? (
                         <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                             <div className="text-center">
                                 <img src="public/assets/public/images/pdf.png" alt="upload" className="size-20"/>
                                 <div>
                                     <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                                         {file.name}
                                     </p>
                                     <p className="text-sm text-gray-500">
                                         {formatSize(file.size)}
                                     </p>s
                                 </div>

                             </div>

                             <button className="p-2 cursor-pointer" onClick={(e)=>
                             {onFileSelect?.(null)}}>
                                 <img src="public/assets/public/icons/cross.svg" alt="remove" className="w-4 h-4"/>
                             </button>
                         </div>


                     ): (
                         <div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">
                                    Click to Upload
                                </span>
                                or drag and drop.
                            </p>
                             <p className="text-lg text-gray-500">
                                 PDF ({formatSize(maxFileSize)})
                             </p>
                         </div>
                     )
                 }
             </div>
            </div>
        </div>
    )
}

export default FileUploader;