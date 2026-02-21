import { GoogleGenerativeAI } from '@google/generative-ai';
import * as cheerio from 'cheerio';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    console.log("1. Fetching website (Stripe)...");
    try {
        const response = await fetch("https://stripe.com");
        const html = await response.text();

        const $ = cheerio.load(html);
        $('script, style, nav, footer, noscript, iframe, header').remove();
        const text = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 12000);

        console.log(`- Extracted ${text.length} characters of text.`);

        console.log("2. Calling Gemini API...");
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `You are a VC analyst. Return JSON with { "summary": "test" } for this text: ${text.substring(0, 500)}`;

        const result = await model.generateContent(prompt);
        console.log("- Gemini Response:", result.response.text());
        console.log("✅ GEMINI INTEGRATION IS WORKING!");
    } catch (e) {
        console.error("❌ ERROR DURING TEST:", e);
    }
}

test();
