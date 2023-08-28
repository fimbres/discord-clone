"use client";

import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing';
import "@uploadthing/react/styles.css"
import Image from 'next/image';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FileUploadProps {
    endpoint: "serverImage" | "messageFile"
    value: string;
    onChange: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ value, endpoint, onChange }) => {
    const fileType = value?.split(".").pop();

    if(value && fileType !== "pdf") {
        return(
            <div className='relative h-20 w-20'>
                <Image fill src={value} alt='Uploaded File' className='rounded-full' />
                <Button onClick={() => onChange("")} className='bg-rose-500 text-white p-1 rounded-full abslute top-0 right-0 shadow-sm' type='button'>
                    <X className='h-4 w-4'/>
                </Button>
            </div>
        );
    }

  return (
    <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].fileUrl!);
        }}
        onUploadError={(error: Error) => {
            console.error(error.message);
        }}
    />
  )
}

export default FileUpload;