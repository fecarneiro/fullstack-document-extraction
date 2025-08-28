'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      if (!uploadResponse.ok) throw new Error(await uploadResponse.json());
      console.log(uploadResponse, 'aeeeeee');
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
        <div className="p-10 flex flex-col items-center rounded-lg shadow-xl gap-4 max-w-md mx-auto">
          <h3>Result</h3>
          <div>{uploadResponse.data}</div>
        </div>
        {/* Old */}
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Upload
        </button>
      </div>
      <Result />
    </div>
  );
}
