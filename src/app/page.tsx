'use client';

import { useState } from 'react';

export default function Home() {
  const [showResult, setShowResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a valid PDF file.');
      return;
    }

    setLoading(true);
    setShowResult(null);
    setError('');

    try {
      const formData = new FormData();
      formData.set('file', file);

      const uploadFile = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadFile.json();
      if (!uploadFile.ok) {
        throw new Error(`Erro: ${uploadFile.status}`);
      }

      setShowResult(uploadResult.parsedResult);
    } catch (e: any) {
      setError('Error processing the document. Try again later.');
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
        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
          {/* File Select */}
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="text-sm"
          />
          {file && (
            <p className="text-sm text-gray-600">Selected File: {file.name}</p>
          )}
          {/* File Submit */}
          <input
            type="submit"
            value={loading ? 'Processing...' : 'Upload'}
            disabled={loading || !file}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
          />
        </form>
      </div>
      {/* Result - show only if: result, error or loading state */}
      {(loading || showResult || error) && (
        <div className="p-10 flex flex-col items-center rounded-lg shadow-xl gap-4 max-w-md mx-auto">
          <h3 className="text-lg font-semibold">Result</h3>

          {/* Loading */}
          {loading && (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
              role="status"
            ></div>
          )}

          {/* Show Result */}
          {showResult && (
            <div className="w-full">
              <pre className="text-xs text-left bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(showResult, null, 2)}
              </pre>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
        </div>
      )}
    </div>
  );
}
