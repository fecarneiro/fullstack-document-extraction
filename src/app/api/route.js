import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function extraction(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content;
    console.log(response);
    if (!response) throw new Error('Resposta vazia da OpenAI');
    return JSON.parse(response);
  } catch (error) {
    console.error(error);
  }
}

const prompt = `
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

console.log(extraction(prompt));
