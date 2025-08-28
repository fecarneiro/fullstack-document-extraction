import dotenv from 'dotenv';
import fs from 'fs';
import OpenAI from 'openai';

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

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
    });

    const result = response.output_text;
    console.log(result);

    if (!result) throw new Error('Resposta vazia da OpenAI');
    return;
  } catch (error) {
    console.error(error);
  }
}
