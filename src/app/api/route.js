import dotenv from 'dotenv';
import fs from 'fs';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';

// const ExtractedData = z.object({
//   transport_date: z.string(),
//   shipper: { cnpj: z.string(), name: z.string() },
//   goods: { name: z.string(), value: z.number() },
//   origin: { city: z.string(), uf: z.string() },
//   destination: { city: z.string(), uf: z.string() },
// });

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const instructions = `
Extraia deste documento: 
- data da emissão
- o nome do tomador
- o cnpj do tomador
- o nome da mercadoria
- o valor total da mercadoria
- a origem (cidade e estado)
- destino (cidade e estado).

Sua resposta obrigatoriamente deverá ser um JSON neste formato:
{
  "transport_date",
  "shipper": {
    "cnpj",
    "name",
  },
  goods: {
    "name",
    "value_brl",
  },
  origin: {
    "city",
    "uf",
  },
  destination: {
    "city",
    "uf",
  },
}
`;

export async function extractData(instructions) {
  try {
    const file = await client.files.create({
      file: fs.createReadStream('test.pdf'),
      purpose: 'user_data',
    });

    const response = await client.responses.parse({
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_file',
              file_id: file.id,
            },
            {
              type: 'input_text',
              text: instructions,
            },
          ],
        },
      ],
      text: { format: { type: 'json_object' } },
      // text: {
      //   format: zodTextFormat(ExtractedData, 'extractedData'),
      // },
    });

    console.log(response.output_text);

    if (!extractData) throw new Error('Resposta vazia da OpenAI');
    return JSON.parse(extractData);
  } catch (error) {
    console.error(error);
  }
}

console.log(extractData(instructions));
