import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
import fs from 'fs';
import OpenAI from 'openai';

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    // this is where the 'common code' stops
    // and we can use the data in the buffer wherever we want
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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

    const readFile = await client.files.create({
      file: fs.createReadStream(buffer),
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
              file_id: readFile.id,
            },
            {
              type: 'input_text',
              text: instructions,
            },
          ],
        },
      ],
      text: { format: { type: 'json_object' } },
    });

    const result = response.output_text;
    console.log(result);

    if (!result) throw new Error('Resposta vazia da OpenAI');
    return;
  } catch (error) {
    console.error(error);
  }
}
