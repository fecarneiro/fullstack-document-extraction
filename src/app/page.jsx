export default function Page() {
  return (
    <div className="p-10 flex flex-col items-center rounded-lg shadow-xl gap-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Document Extractor</h1>
      <p className="text-sm">
        Selecione um documento PDF para fazer upload e extrair as informações em
        JSON.
      </p>
      <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Upload
      </button>
    </div>
  );
}

// <div class="p-4 rounded shadow max-w-md">

//   <h3 class="font-bold text-xl mb-2">
//     <!-- card title -->
//   </h3>

//   <!-- card content -->

//   <button class="bg-blue-500 text-white p-2 block mt-4">
//     <!-- call to action -->
//   </button>

// </div>
