
import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryPreferences, Itinerary } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A creative and exciting title for the entire Bali trip itinerary. e.g., 'The Ultimate Bali Adventure' or 'Serenity & Spice: A Bali Escape'."
    },
    overall_summary: {
        type: Type.STRING,
        description: "A short, engaging paragraph (2-3 sentences) summarizing the trip's overall theme and flow, highlighting the key experiences based on the user's interests."
    },
    daily_plans: {
      type: Type.ARRAY,
      description: "An array of objects, where each object represents one day of the itinerary.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.INTEGER,
            description: "The day number of the itinerary, starting from 1.",
          },
          title: {
            type: Type.STRING,
            description: "A catchy title for the day's activities. e.g., 'Ubud's Cultural Heart' or 'Coastal Wonders of Uluwatu'."
          },
          location: {
            type: Type.STRING,
            description: "The primary town or region for this day's activities. MUST be a valid Bali location name like 'Ubud', 'Seminyak', 'Canggu', 'Uluwatu', 'Nusa Dua', 'Sanur', 'Kuta', 'Lovina', 'Amed', 'Kintamani', or 'Bedugul'."
          },
          summary: {
              type: Type.STRING,
              description: "A brief (1-2 sentences) summary of what the day entails, its theme, and the general location."
          },
          accommodation: {
             type: Type.OBJECT,
             description: "A recommended place to stay for this night, matching the user's budget and the day's location.",
             properties: {
                name: { type: Type.STRING, description: "Name of the hotel, villa, or guesthouse." },
                description: { type: Type.STRING, description: "Brief reason why this place is a good choice (view, location, amenities)." }
             },
             required: ['name', 'description']
          },
          activities: {
            type: Type.ARRAY,
            description: "An array of 2 to 4 activities for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                name: {
                  type: Type.STRING,
                  description: "The name of the activity, place, or restaurant."
                },
                description: {
                  type: Type.STRING,
                  description: "A short, enticing description (1-2 sentences) of the activity, explaining why it's recommended."
                },
                type: {
                    type: Type.STRING,
                    enum: ['Dining', 'Culture', 'Adventure', 'Relaxation', 'Scenery', 'Shopping', 'Nightlife'],
                    description: "The category of the activity."
                }
              },
              required: ['name', 'description', 'type']
            }
          }
        },
        required: ['day', 'title', 'location', 'summary', 'activities', 'accommodation']
      }
    }
  },
  required: ['title', 'overall_summary', 'daily_plans']
};

export const generateItinerary = async (prefs: ItineraryPreferences): Promise<Itinerary> => {
  const prompt = `
    Create a personalized Bali travel itinerary with the following specifications:
    - Trip Start Date: ${prefs.startDate}
    - Duration: ${prefs.duration} days
    - Number of Travelers: ${prefs.travelers}
    - Budget Level: ${prefs.budget}
    - Primary Interests: ${prefs.interests.join(', ')}
    - Must-See Places (if any): ${prefs.mustSees || 'None specified, use your expertise to suggest popular and hidden gems.'}

    Your task is to act as Ketut, an expert and friendly Balinese tour guide. Generate a detailed, day-by-day itinerary that is geographically logical (grouping nearby activities), exciting, and tailored to the user's preferences. 
    
    - For a 'Budget' trip, focus on free activities, local warungs (eateries), and affordable guesthouses/homestays.
    - For a 'Mid-range' trip, include a mix of popular attractions, nice restaurants, and comfortable 3-4 star hotels or private villas.
    - For a 'Luxury' trip, suggest private tours, fine dining, high-end 5-star resorts, and exclusive experiences.

    **Crucial:** For each day, suggest a specific accommodation (Hotel/Villa/Homestay) that fits the location and budget.

    Ensure each day has a good balance of activities, without being too rushed. Provide a mix of iconic landmarks and authentic, off-the-beaten-path experiences. The tone should be warm, inviting, and professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as Itinerary;

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to generate itinerary from AI service.");
  }
};
