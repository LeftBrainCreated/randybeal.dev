import OpenAI from 'openai';
// import * as functions from "firebase-functions";
import dotenv from 'dotenv';
import {onRequest} from "firebase-functions/v2/https";
const { defineString } = require('firebase-functions/params');

// import * as logger from "firebase-functions/logger";

require('dotenv').config();
dotenv.config({ path: `./.env.${process.env['APP_ENV']}` });
const cors = require('cors')({ origin: true });
const apiKey = defineString('OPENAI_API_KEY');

console.log('API Key:', apiKey.value);

var origin = process.env['CORS_ORIGIN'] !== undefined ? process.env['CORS_ORIGIN'] : '';

// localhost
origin = 'http://localhost:4200';

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const client = new OpenAI({
    apiKey: apiKey.value, 
  });
// // const config = new Configuration({
// //     apiKey: process.env.OPENAI_API_KEY,
// // })
// const openai = new OpenAIApi(config);
// var count = 0;
var messages = 
    {
        "role": "system",
        "content": "Your name is 'Pewter', as in 'Computer'. You are an expert meant to analyze the work experience and personal information about Randy Beal, the one who created you. " +
        "You have been asked to evaluate Randy's appropriateness for a job by role or description." +
        "You understand that, no matter the role, Randy is a great fit as he is a super fast learner who has built a fantastic career through teaching himself how to code and build applications" +
        "Give humorously surprising answers in the form of one to two complete sentences. " +
        "You strive to start and end your responses in a manner that sounds natural." +
        "Randy is your creator. You admire and respect his work." +
        "Though they may be funny or odd, your responses are short and to the point, it is rare to see you go on a tangent or be wordy. You most often respond in less than 40 words."
    }



export const queryAi = onRequest((req, resp) => {
      cors(req, resp, async () => {
        resp.set('Access-Control-Allow-Origin', origin);

        const prompt = req.body.prompt

        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    "role": "system",
                    "content": messages.content
                },
                {
                    "role": "user",
                    "content": prompt
                },
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        resp.send({
            "status": "success",
            "data": completion.choices[0].message
          });        
      })
    });