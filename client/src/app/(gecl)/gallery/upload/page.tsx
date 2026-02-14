"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useApi } from "@/gecl/hooks/useApi"; // Assuming you have this hook
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUploadCloud,
  FiX,
  FiImage,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
  FiFolder,
  FiLoader,
} from "react-icons/fi";

// --- CONFIG ---
const MAX_FILES = 10;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface Category {
  id: string;
  category: string;
}

export default function GalleryUpload() {
  const { request } = useApi();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // --- 1. FETCH CATEGORIES ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request<Category[]>({
          method: "GET",
          url: "/gallery/categories",
        });
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          setError("Failed to load categories.");
        }
      } catch (err) {
        setError("Network error loading categories.");
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategories();
  }, [request]);

  // --- 2. FILE HANDLING ---

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const validateAndAddFiles = (newFiles: File[]) => {
    setError(null);
    const validFiles: File[] = [];
    let currentCount = files.length;

    for (const file of newFiles) {
      // Check File Type
      if (!file.type.startsWith("image/")) {
        setError(`"${file.name}" is not an image.`);
        continue;
      }
      // Check Size
      if (file.size > MAX_SIZE_BYTES) {
        setError(`"${file.name}" exceeds ${MAX_SIZE_MB}MB limit.`);
        continue;
      }
      // Check Count
      if (currentCount >= MAX_FILES) {
        setError(`Maximum ${MAX_FILES} images allowed.`);
        break;
      }

      validFiles.push(file);
      currentCount++;
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      const newPreviews = validFiles.map((f) => URL.createObjectURL(f));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndAddFiles(Array.from(e.target.files));
    }
    // Reset input so same file can be selected again if cleared
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      // Revoke the specific URL being removed
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // --- 3. UPLOAD LOGIC ---
  const handleUpload = async () => {
    if (!selectedCategory) {
      setError("Please select a category first.");
      return;
    }
    if (files.length === 0) {
      setError("Please select at least one image.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("categoryId", selectedCategory);

      files.forEach((file) => {
        formData.append("images", file);
      });

      const res = await request({
        method: "POST",
        url: "/gallery",
        data: formData,
        // Content-Type header is usually handled automatically by browser when sending FormData
      });

      if (res.success) {
        setSuccess(true);
        setFiles([]);
        setPreviews([]);
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res.message || "Upload failed.");
      }
    } catch (err) {
      setError("Network error during upload.");
    } finally {
      setUploading(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <FiUploadCloud className="text-violet-600" /> Upload to Gallery
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add photos to an existing album. Max 10 images (10MB each).
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-8 space-y-8">
        {/* 1. CATEGORY SELECTION */}
        <div>
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 block">
            Select Album Category
          </label>
          {loadingCats ? (
            <div className="flex items-center gap-2 text-sm text-slate-400 animate-pulse">
              <FiLoader className="animate-spin" /> Loading categories...
            </div>
          ) : (
            <div className="relative">
              <FiFolder
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl p-3 pl-12 appearance-none outline-none focus:ring-2 focus:ring-violet-500/50 transition-all cursor-pointer"
              >
                <option value="" disabled>
                  -- Choose an Album --
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </select>
              {/* Custom arrow could go here */}
            </div>
          )}
        </div>

        {/* 2. DRAG & DROP ZONE */}
        <div
          className={`relative border-3 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${
            dragActive
              ? "border-violet-500 bg-violet-50 scale-[1.01]"
              : "border-slate-200 bg-slate-50 hover:bg-slate-100"
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-violet-500">
              <FiImage size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-700">
              Drag & Drop photos here
            </h3>
            <p className="text-slate-400 text-sm mt-1 mb-6">
              or click to browse from computer
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:border-violet-400 hover:text-violet-600 transition-all pointer-events-auto shadow-sm"
            >
              Select Images
            </button>
          </div>
        </div>

        {/* ERROR / SUCCESS MESSAGES */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-bold"
            >
              <FiAlertCircle size={18} /> {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-green-50 text-green-600 rounded-xl flex items-center gap-3 text-sm font-bold"
            >
              <FiCheckCircle size={18} /> Uploaded Successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. PREVIEW GRID */}
        {files.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Ready to Upload ({files.length}/{MAX_FILES})
              </h4>
              <button
                onClick={() => {
                  setFiles([]);
                  setPreviews([]);
                }}
                className="text-xs font-bold text-red-400 hover:text-red-600 flex items-center gap-1"
              >
                <FiTrash2 /> Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {previews.map((url, idx) => (
                  <motion.div
                    key={url} // url is unique enough for local preview key
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200"
                  >
                    <Image
                      src={url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />

                    {/* Overlay info */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-[10px] font-bold text-white mb-2 truncate w-full px-2">
                        {(files[idx].size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <button
                        onClick={() => removeFile(idx)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* 4. ACTION BUTTON */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0 || !selectedCategory}
            className={`w-full py-4 rounded-xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 transition-all ${
              uploading || files.length === 0 || !selectedCategory
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-500 text-white shadow-lg hover:shadow-violet-500/30 active:scale-95"
            }`}
          >
            {uploading ? (
              <>
                <FiLoader className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <FiUploadCloud size={18} /> Upload{" "}
                {files.length > 0 ? `${files.length} Images` : ""}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
