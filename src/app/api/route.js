import dotenv from 'dotenv';
import fs from 'fs';
import OpenAI from 'openai';

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const instructions = `
Extraia deste documento: data da emissão, o nome e cnpj do tomador, o nome da mercadoria, o valor total da mercadoria, a origem (cidade e estado) e destino (cidade e estado).

Sua resposta obrigatoriamente deverá ser um JSON neste formato:

transport_date,
shipper: {
  cnpj,
  name,
},
goods: {
  name,
  value_brl,
},
origin: {
  city,
  uf,
},
destination: {
  city,
  uf,
},
`;

export async function extraction() {
  try {
    const file = await client.files.create({
      file: fs.createReadStream('kona.pdf'),
      purpose: 'user_data',
    });

    const response = await client.responses.create({
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
              text: 'Quais as principais informações do PDF?',
            },
          ],
        },
      ],
    });

    console.log(response.output_text);

    if (!extractedData) throw new Error('Resposta vazia da OpenAI');
    return JSON.parse(extractedData);
  } catch (error) {
    console.error(error);
  }
}

console.log(extraction());
