'use client';

import { useState } from 'react';

export default function Home() {
  const [showResult, setShowResult] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.set('file', file);

      const uploadFile = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadFile.json();
      if (!uploadResult.ok) throw new Error(uploadResult.error);

      setShowResult(uploadResult.result);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Main Card - Upload File */}
      <div className="p-10 flex flex-col items-center rounded-lg shadow-xl gap-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold">Document Extractor</h1>
        <p className="text-sm">
          Selecione um documento PDF para fazer upload e extrair as informações
          em JSON.
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <input type="submit" value="upload" />
        </form>

        {/* Old */}
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Upload
        </button>
      </div>
      {/* Result */}
      <div className="p-10 flex flex-col items-center rounded-lg shadow-xl gap-4 max-w-md mx-auto">
        <h3>Result</h3>
        {/* Loading */}
        {loading && (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        )}
        {/* Display Result */}
        <p>{JSON.stringify(showResult, null, 2)}</p>
      </div>
    </div>
  );
}
