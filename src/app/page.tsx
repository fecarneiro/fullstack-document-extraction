'use client';

import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState();
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      // if (!uploadResult.ok) throw new Error(uploadResult.error);

      setResult(uploadResult.result);
    } catch (e: any) {
      console.error(e);
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
        <p>{result}</p>
      </div>
    </div>
  );
}
