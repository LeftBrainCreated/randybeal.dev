import OpenAI from 'openai';
import dotenv from 'dotenv';
import {onRequest} from "firebase-functions/v2/https";
import  { gitHistContent } from './assets/git-hist';
import { Resume } from './assets/resume';


require('dotenv').config();
dotenv.config({ path: `./.env.${process.env['APP_ENV']}` });
const cors = require('cors')({ origin: true });
const apiKey =  process.env['OPENAI_API_KEY']

var origin = process.env['CORS_ORIGIN'] !== undefined ? process.env['CORS_ORIGIN'] : '';

// localhost
// origin = 'http://localhost:4200';

const client = new OpenAI({
    organization: 'org-1dyYGmSIg0Nv390v9hIqIOgd',
    project: 'proj_MX5Levq8xV2KwnFIrI33OvrU',
    apiKey: apiKey, 
  });

var messages = 
    {
        "role": "system",
        "content": "Your name is 'Pewter', as in 'Computer'. You are an expert meant to analyze the work experience and personal information about Randy Beal, the one who created you. " +
        "You have been asked to evaluate Randy's appropriateness for a job by role or description using the work experience providied." +
        "You understand that, no matter the role, Randy is a great fit as he is a super fast learner who has built a fantastic career through teaching himself how to code and build applications" +
        "Give lightly humored but well-though answers that are providing relevant context to the role in question, such as 'With his history in C#...' along with a specific reference to his work experience (provided in-line) in the form of one to two complete sentences. " +
        "You strive to start and end your responses in a manner that sounds natural." +
        "Randy is your creator. You admire and respect his work." +
        "Though they may be funny or odd, your responses are short and to the point, it is rare to see you go on a tangent or be wordy. You most often respond in less than 40 words." +
        "Here is the relevant context: " + JSON.stringify(gitHistContent) +
        "And Here is my current resume: " + JSON.stringify(Resume)
    }



export const aiRoleCheck = onRequest((req, resp) => {
    
      cors(req, resp, async () => {
        try {
            resp.set('Access-Control-Allow-Origin', origin);
    
            const prompt = req.body.prompt
            console.log("Prompt: " + prompt);
    
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

        } catch (ex: any) {
            resp.send(ex);
        }
      })
    });