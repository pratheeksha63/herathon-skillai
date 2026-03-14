import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateMockIdea } from "./mockData.js";

const apiKey = import.meta.env?.VITE_GEMINI_KEY;
const USE_MOCK_DATA = import.meta.env?.VITE_USE_MOCK === "true" || !apiKey;

// Prioritized list of stable models
const MODEL_CANDIDATES = [
  "gemini-1.5-flash", 
  "gemini-1.5-pro",
  "gemini-2.0-flash-exp"
];

const SECTION_ORDER = [
  "businessName", "tagline", "idea", "targetCustomers", "pricing",
  "competitorLandscape", "firstWeekPlan", "platformStrategy",
  "localMarketingTips", "risksAndMitigation", "materials",
  "startupChecklist", "startupCost", "profitPerSale",
  "breakEvenSales", "weeklyTimeCommitment", "instaBio", "whatsappPitch"
];

function buildPrompt(answers) {
  const city = answers.city || "your city";
  const skill = answers.skill || "your skill";
  const budget = answers.budget || "your budget";
  
  return `
    You are a startup strategist for micro-businesses in India.
    Create a specific micro business plan for:
    Skill: ${skill} | Budget: ${budget} | City: ${city}
    
    Return ONLY valid JSON with these keys: ${SECTION_ORDER.join(", ")}.
    All currency in INR. Be extremely specific.
  `;
}

// Helper to extract JSON from potential markdown wrappers
function cleanJsonString(str) {
  return str.replace(/```json|```/g, "").trim();
}

export async function streamIdea(answers, { onSection, onDone, onError } = {}) {
  if (!apiKey) {
    onError?.(new Error("API Key missing"));
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError = null;

  // Instead of testing all models first, try them one by one for the ACTUAL task
  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { temperature: 0.7, response_mime_type: "application/json" }
      });

      const result = await model.generateContentStream(buildPrompt(answers));
      
      let fullText = "";
      const emittedKeys = new Set();

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;

        // Try to parse partial JSON
        try {
          const cleaned = cleanJsonString(fullText);
          // Simple regex to find "key": "value" or "key": {...}
          SECTION_ORDER.forEach(key => {
            if (!emittedKeys.has(key) && cleaned.includes(`"${key}"`)) {
              // Extract the value if the next key exists or JSON ends
              try {
                const tempObj = JSON.parse(cleaned + (cleaned.endsWith("}") ? "" : "}"));
                if (tempObj[key]) {
                  onSection?.(key, tempObj[key]);
                  emittedKeys.add(key);
                }
              } catch (parseErr) {
                // Ignore partial parsing errors during stream
              }
            }
          });
        } catch (e) {
          // Ignore partial parsing errors during stream
        }
      }

      const cleaned = cleanJsonString(fullText);
      if (!cleaned) {
        throw new Error("Empty response from model");
      }

      const finalContent = JSON.parse(cleaned);
      onDone?.(finalContent);
      return; // Success! Exit the loop.

    } catch (err) {
      console.warn(`Model ${modelName} failed, trying next...`, err);
      lastError = err;
      continue; 
    }
  }

  onError?.(lastError || new Error("All models failed"));
}

// Simple wrapper for non-streaming usage
export async function generateIdea(answers) {
  // Use mock data if API key is missing or mock mode is enabled
  if (USE_MOCK_DATA) {
    console.log("Using mock data (API unavailable or mock mode enabled)");
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return generateMockIdea(answers);
  }

  return new Promise((resolve, reject) => {
    streamIdea(answers, {
      onDone: (idea) => resolve(idea),
      onError: (error) => {
        console.warn("API failed, falling back to mock data:", error);
        // Fallback to mock data on error
        setTimeout(() => {
          resolve(generateMockIdea(answers));
        }, 500);
      }
    });
  });
}