/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from 'react';

import {
  Button,
  Flex,
  Spinner,
  TextField,
} from '@radix-ui/themes';

import { getImageSrc } from '../api/cloudinary';
import { scanReceiptWithAI } from '../api/gemini';
import SubHeader from './SubHeader';
import UploadFile from './UploadFile';

const ScanReceipt = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const onFileUpload = (files: File[]) => {
    // Handle the uploaded files here
    setUploadedFiles(files);
  };

  const scanReceipt = async () => {
    setIsLoading(true);

    try {
      const result = await scanReceiptWithAI(uploadedFiles);
      setData(result);
      await getImageSrc(uploadedFiles[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="2">
      {!data ? (
        <>
          <SubHeader
            title="Scan Receipt"
            description="Take a photo or upload an image of your receipt"
          />
          <UploadFile onFileUpload={onFileUpload} isLoading={isLoading} />
          <Button
            type="button"
            color="orange"
            variant="soft"
            disabled={uploadedFiles.length === 0 || isLoading}
            onClick={scanReceipt}
          >
            {isLoading && <Spinner />}
            Scan Receipt
          </Button>
        </>
      ) : (
        <>
          <SubHeader
            title="Summary"
            description="List all the items on your receipt"
            onBack={() => setData(null)}
          />

          <Flex direction="column" gap="3">
            {data.items &&
              data.items.map((item: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <TextField.Root
                    variant="classic"
                    value={item.name}
                    disabled
                  />
                  <TextField.Root
                    variant="classic"
                    value={`$${Number(item.price).toFixed(2)}`}
                    disabled
                  />
                </div>
              ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};
export default ScanReceipt;
