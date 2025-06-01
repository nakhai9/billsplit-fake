/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import {
  FileRejection,
  useDropzone,
} from 'react-dropzone';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Spinner } from '@radix-ui/themes';

import ScanIcon from '../ui/ScanIcon';

type CompProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  onFileUpload?: (file: File[]) => void;
};

const UploadFile: React.FC<CompProps> = ({
  onFileUpload,
  children,
  isLoading = false,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles(acceptedFiles);
      if (onFileUpload) {
        onFileUpload(acceptedFiles);
      }
    },
    onDropRejected: (fileRejections: FileRejection[]) => {
      alert("Only allowed to upload PNG files.");
    },
    accept: {
      "image/png": [".png", ".PNG"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const clear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUploadedFiles([]);
    if (onFileUpload) {
      onFileUpload([]);
    }
  };

  return (
    <div className="relative bg-gray-50 bg-white p-4 border border-gray-300 rounded-lg h-[400px]">
      <div
        className={clsx(
          isDragActive && "border-blue-200 bg-blue-50",
          isLoading && "bg-black/10",
          "relative overflow-hidden flex justify-center items-center border-2 bg-[var(--background)] border-[var(--background)] hover:border-blue-100 p-4 border-dashed rounded-lg w-full h-full cursor-pointer"
        )}
      >
        {isLoading && (
          <div className="z-5 absolute inset-0 bg-orange-500/30 backdrop-md h-1 animate-scan-line"></div>
        )}

        {isLoading && (
          <div className="top-1/2 left-1/2 z-10 absolute flex justify-center items-center bg-white px-2 py-1 rounded-md text-gray-700 -translate-x-1/2 -translate-y-1/2">
            <Spinner /> Loading
          </div>
        )}

        {uploadedFiles.length > 0 ? (
          <div
            className={clsx(
              isLoading && "opacity-45 ",
              "relative w-full h-full preview-zone"
            )}
          >
            {!isLoading && (
              <button
                onClick={clear}
                type="button"
                className="top-0 left-0 z-10 absolute bg-white hover:bg-gray-100 shadow-lg p-1 border border-slate-200 rounded-full cursor-pointer"
              >
                <Cross2Icon />
              </button>
            )}

            {uploadedFiles.map((file, index) => (
              <Image
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-contain"
              />
            ))}
          </div>
        ) : (
          <div
            {...getRootProps({
              className:
                "dropzone h-full w-full flex justify-center items-center gap-4 flex-col",
            })}
          >
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              {...getInputProps()}
            />
            <ScanIcon size="lg" />
            <div>
              <p className="font-medium">Take a photo</p>
              <p className="text-gray-500 text-sm underline">
                or upload receipt
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
