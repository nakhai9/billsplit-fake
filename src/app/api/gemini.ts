import { GoogleGenerativeAI } from '@google/generative-ai';

import { Utils } from '../utils/common';

export const scanReceiptWithAI = async (files: File[]) => {
  const systemPrompt = `
    You are an expert at extracting information from receipts.
    
    Your task:
    1. Analyze the receipt image provided
    2. Extract all relevant billing information
    3. Format the data in a structured way

    Required output structure:
      {
        "date": "YYYY-MM-DD",                 // Example: "2022-02-01" (if day is less than 10, do not add a leading zero)
        "items": [
          { "name": string, "price": string } // Price must be a decimal string, e.g., "28000.00"
        ],
        "restaurant_name": string | null,
        "tax": string | null,                 // Only extract the amount, not percentage. Return null if missing.
        "tip": string | null                  // If multiple tips are shown, return the medium one. Otherwise, return null.
      }
    
    Guidelines for extraction:
      - Identify the restaurant/business name and location if available otherwise just return null
      - Find the receipt date or return null, date format should be YYYY-MM-DD but if day it's less than 10 don't add a 0 in front
      - Extract each item with its name and total price
      - Capture tax amount, if applicable and not percentage but the money amount otherwise return null
      - Identify any tips or gratuities, if multiple tips are shown just output the medium one otherwise return null
      - Ensure all numerical values are accurate
      - Convert all prices to decimal numbers
      
    IMPORTANT: Extract ONLY the information visible in the receipt. Do not make assumptions about missing data.
`;

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
  );
  const model = genAI.getGenerativeModel({
    model: process.env.NEXT_PUBLIC_GEMINI_MODEL ?? "",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const content = [
    {
      text: systemPrompt,
    },
    {
      inlineData: {
        data: await Utils.file.convertFileToBase64(files[0]),
        mimeType: `${files[0].type}`,
      },
    },
  ];

  const response = await model.generateContent(content);
  const result = response.response.text();
  return JSON.parse(result);
};
