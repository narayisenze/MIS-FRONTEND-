"use client";
import { API, useAddData, useFetchData, useUpdateData } from "@/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import React, { use, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FormField from "./components/FormField";

const createDocumentSchema = z.object({
  documents: z.array(
    z.object({
      documentName: z.string().min(1, "Document name is required"),
      documentUrl: z.string().min(1, "Document URL is required"),
    })
  ),
});

const updateDocumentSchema = z.object({
  documentName: z.string().min(1, "Document name is required"),
  documentUrl: z.string().min(1, "Document URL is required"),
});

type CreateDocumentSchemaType = z.infer<typeof createDocumentSchema>;
type UpdateDocumentSchemaType = z.infer<typeof updateDocumentSchema>;

interface Props {
  title: string;
  toggleModal: () => void;
}

const DigitalFactSheetForm = ({ toggleModal, title }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [documentUrls, setDocumentUrls] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [showDropzone, setShowDropzone] = useState(false);

  // For update mode only
  const [updateDocumentName, setUpdateDocumentName] = useState("");
  const [updateDocumentUrl, setUpdateDocumentUrl] = useState("");

  const createForm = useForm<CreateDocumentSchemaType>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      documents: [],
    },
  });

  const updateForm = useForm<UpdateDocumentSchemaType>({
    resolver: zodResolver(updateDocumentSchema),
    defaultValues: {
      documentName: "",
      documentUrl: "",
    },
  });

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post("/fileManager/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return {
        name: file.name,
        url: response.data?.data?.fileUrl,
      };
    } catch (error) {
      toast.error("File upload failed");
      return null;
    }
  };

  const handleRemoveFile = () => {
    setFiles([]);
    setShowDropzone(false);
  };

  const handleReplaceFile = () => {
    setShowDropzone(true);
    setUpdateDocumentUrl("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles((current) => [...current, ...acceptedFiles]);
      setDocumentNames((current) => [
        ...current,
        ...acceptedFiles.map((file) => file.name),
      ]);
    },
    maxFiles: undefined,
  });

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-muted-foreground" />;
    }
    return <FileText className="h-8 w-8 text-muted-foreground" />;
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={100}
          height={100}
          className="rounded object-cover"
        />
      );
    }
    return (
      <div className="w-[100px] h-[100px] rounded bg-muted flex items-center justify-center">
        {getFileIcon(file.type)}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toggleModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        {
          <div {...getRootProps({ className: "dropzone h-full" })}>
            <input {...getInputProps()} />
            <div className="border-2 border-dashed rounded-lg p-6 text-center h-full flex flex-col items-center justify-center w-full">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag & drop documents here <br /> or <br /> click to select
                documents to add
              </p>
              <p className="text-xs text-muted-foreground mt-1 hidden">
                Maximum size per file: 2MB
              </p>
            </div>
          </div>
        }

        {files.length > 0 && (
          <div className="border-2 border-dashed rounded-lg h-full">
            <div className="flex flex-col p-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative group">
                    {getFilePreview(file)}
                    <Button
                      type="button"
                      color="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => {
                        setFiles((current) =>
                          current.filter((_, i) => i !== index)
                        );
                        setDocumentNames((current) =>
                          current.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <FormField
                      fieldType="input"
                      id={`documentName-${index}`}
                      label="Document Name"
                      value={documentNames[index]}
                      onChange={(e: any) => {
                        const newNames = [...documentNames];
                        newNames[index] = e.target.value;
                        setDocumentNames(newNames);
                      }}
                      placeholder="Enter document name"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-5 flex justify-end">
        <Button type="submit">Add {title}</Button>
      </div>
    </form>
  );
};

export default DigitalFactSheetForm;
