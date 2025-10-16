import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import FilterPanel from "./components/FilterPanel";
import ResultCard from "./components/ResultCard";
import { enhanceCloudinaryUrl } from "./utils/cloudinary";
import { Upload, Search, Image as ImageIcon } from "lucide-react";

export default function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    baseColour: "",
    category: "",
    similarity: 0,
  });

  const handleSearch = async () => {
    if (!file && !url)
      return setError("😊 Upload a file or enter a URL first!");
    // Clear previous results and errors
    setAllResults([]);
    setFilteredResults([]);
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (url) {
        // Enhance Cloudinary URLs for better quality
        const optimizedUrl = enhanceCloudinaryUrl(url);
        formData.append("imageUrl", optimizedUrl);
      }
      formData.append("filters", JSON.stringify(filters));

      const backendURL = `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api/products/search`;


      const res = await axios.post(backendURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const topResults = res.data.slice(0, 16);
      setAllResults(topResults);
      setFilteredResults(topResults);
    } catch {
      setError("😔 Failed to fetch results. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleFrontendFilter = () => {
    if (!file && url.trim() === "") {
      setError("😊 Please upload an image or enter a URL to apply filters!");
      return;
    }

    let results = allResults;
    setError("");

    if (filters.gender)
      results = results.filter((r) => r.gender === filters.gender);
    if (filters.baseColour)
      results = results.filter((r) => r.baseColour === filters.baseColour);
    if (filters.category)
      results = results.filter((r) => r.masterCategory === filters.category);
    if (filters.similarity)
      results = results.filter((r) => r.similarity >= filters.similarity / 100);

    if (results.length === 0) {
      setError(
        "😔 No products found matching your filters. Try changing them!"
      );
  }
  setFilteredResults(results.slice(0, 12));
  };

  const removeFile = () => {
    setFile(null);
    setAllResults([]);
    setFilteredResults([]);
    setError("");
  };

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    if (val.trim() === "") {
      setAllResults([]);
      setFilteredResults([]);
      setError("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0B1F15] via-[#0D1711] to-[#0B1F15] text-[#eaeaea]">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Samaan Milaap</h1>
          <p className="text-sm text-[#4ADE80]">Minimal AI Visual Search</p>
        </header>

        {/* Main Content */}
        <main className="flex flex-col gap-8">
          {/* Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <section className="bg-[#132A1F] border border-[#1F3A2E] rounded-xl p-6 space-y-6">
            {/* URL Input */}
            <div>
              <label className="text-sm font-medium text-[#a0a0a0] flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4" />
                Image URL
              </label>
              <input
                type="text"
                placeholder="Paste your image URL here..."
                value={url}
                onChange={handleUrlChange}
                disabled={file !== null}
                className={`w-full px-4 py-3 rounded-lg bg-[#23232a] border border-[#23232a] text-[#eaeaea] focus:outline-none focus:ring-1 focus:ring-[#353545] text-sm ${
                  file ? "opacity-50 cursor-not-allowed" : "hover:border-[#353545]"
                }`}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="text-sm font-medium text-[#a0a0a0] flex items-center gap-2 mb-2">
                <Upload className="w-4 h-4" />
                Upload Image
              </label>
              <Dropzone
                onDrop={(accepted) => setFile(accepted[0])}
                disabled={url.trim() !== ""}
                accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] }}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps()}
                    className={`border border-dashed rounded-lg p-5 text-center transition-colors cursor-pointer bg-[#23232a] border-[#353545] text-[#a0a0a0] ${
                      isDragActive ? "border-[#eaeaea]" : url ? "opacity-50 cursor-not-allowed" : "hover:border-[#eaeaea]"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {file ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-32 object-contain rounded-lg mx-auto"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-sm bg-[#23232a] text-[#eaeaea] border border-[#353545] hover:bg-[#353545]"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="opacity-60">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">
                          {isDragActive ? "Drop it here..." : "Drop or click to upload"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full px-5 py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-[#23232a] text-[#eaeaea] border border-[#353545] hover:bg-[#353545] disabled:opacity-50 text-sm"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#353545] border-t-[#eaeaea] rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Find Similar
                </>
              )}
            </button>
          </section>

            {/* Filter Panel */}
            <section className="bg-[#132A1F] border border-[#1F3A2E] rounded-xl p-6">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onApply={handleFrontendFilter}
              />
            </section>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[#2A1A1A] border border-[#4A2323] rounded-lg p-3 text-[#ffb3b3] text-sm text-center">
              {error}
            </div>
          )}

          {/* Results Grid */}
          {!loading && filteredResults.length > 0 && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResults.map((product, i) => (
                <div 
                  key={product._id || i} 
                  className="bg-[#132A1F] border border-[#1F3A2E] rounded-xl p-4 hover:border-[#4ADE80] transition-colors"
                >
                  <ResultCard product={product} />
                </div>
              ))}
            </section>
          )}

        </main>

        {/* Footer */}
        <footer className="text-center text-[#4ADE80] text-xs opacity-60">
          samaan milaap &middot; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
