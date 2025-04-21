import OpenAI from 'openai';
import dotenv from 'dotenv';
import {onRequest} from "firebase-functions/v2/https";
import  { gitHistContent } from './assets/git-hist.js';
import { Resume } from './assets/resume.js';
import jwt from 'jsonwebtoken';

import { FirestoreService } from './app/services/firestore.service.js';

// import { doc, updateDoc, arrayUnion, getFirestore } from "firebase/firestore";
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import cors from 'cors';
import { UserRef } from './app/interfaces/userRef.js';


dotenv.config();
// const corsCheck = new cors({ origin: true });
const apiKey =  process.env['OPENAI_API_KEY']

var origin = process.env['CORS_ORIGIN'] !== undefined ? process.env['CORS_ORIGIN'] : '';
const corsHandler = cors({ origin: origin });

// localhost
// origin = 'http://localhost:4200';

const client = new OpenAI({
    organization: 'org-1dyYGmSIg0Nv390v9hIqIOgd',
    project: 'proj_MX5Levq8xV2KwnFIrI33OvrU',
    apiKey: apiKey, 
  });

const firestore = new FirestoreService();

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
    
      corsHandler(req, resp, async () => {
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


    //-------------------------------------------------------
    // Faithful Guide API
    //-------------------------------------------------------

    // Private functions
    //-------------------------------------------------------

    const authenticateToken = (req: any, res: any): Promise<void> => {
        return new Promise((resolve, reject) => {
          const authHeader = req.headers['authorization'];
          const token = authHeader && authHeader.split(' ')[1];
          if (!token) {
            res.status(401).send('Unauthorized: No token provided');
            return reject();
          }
      
          jwt.verify(token, process.env.JWT_SECRET as string, (err: any, payload: any) => {
            if (err) {
              res.status(403).send('Forbidden: Invalid token');
              return reject();
            }
      
            (req as any).gptContext = payload;
            resolve();
          });
        });
      };
      

    // Public Endpoints
    //-------------------------------------------------------

    export const authGpt = onRequest((req: any, res: any) => {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.status(401).send('Unauthorized: Missing or invalid authorization header');
        return;
      }
    
      // Decode the base64-encoded string
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    
      // Expecting format: apikey:<secret>
      const [username, providedSecret] = credentials.split(':');
    
      if (username !== 'apikey' || providedSecret !== process.env.GPT_SECRET) {
        res.status(401).send('Unauthorized: Invalid API key');
        return;
      }
    
      const payload = { username: 'apikey' };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
    
      res.json({ token });
      });

      export const appendUserInteraction = onRequest(async (req: any, res: any) => {
        try {
          await authenticateToken(req, res);
      
          const { gptId, userId } = (req as any).gptContext;
      
          console.log(`Interaction from GPT: ${gptId} for user: ${userId}`);
      
          // Save to DB here if needed
          res.status(200).json({ message: "Interaction logged" });
      
        } catch {
          // Already handled inside authenticateToken
        }
      });

      export const getUserObjectStructure = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          res.send(await firestore.getUserObjectStructure());
        } catch (error) {
          console.error("Error fetching user object structure:", error);
          res.status(500).send("Error fetching user object structure");
        }
      });

      export const createUser = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          const userProfile: UserRef = req.body.userProfile;
    
          const createdUserId = await firestore.createUser(userProfile);
          res.status(200).json({ userId: createdUserId });
        }
        catch (error) {
          console.error("Error creating user:", error);
          res.status(500).send("Error creating user");
        }
      });

      export const updateUser = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          const userId = req.body.userId;
          const userProfile: Partial<UserRef> = req.body.userProfile;
    
          await firestore.updateUser(userId, userProfile);
          res.status(200).send("User updated successfully");
        } catch (error) {
          console.error("Error updating user:", error);
          res.status(500).send("Error updating user");
        }
      });

    //   export const getUser = onRequest(async (req: any, res: any) => {
    //     try {
    //         await authenticateToken(req, res);
    //         const { userId } = (req as any).userId;

    //         return firestore.getUserById(userId).then((user: any) => {
    //             if (user) {
    //                 res.status(200).json(user);
    //             } else {
    //                 res.status(404).send("User not found");
    //             }
    //         });
    //     }
    //     catch {
    //         res.status(500).send("Error creating user");
    //         return;
    //     }
    // });



      export const getUserById = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);  

        try {
          const userId = req.body.userId;
          const user = await firestore.getUserById(userId);
    
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).send("User not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          res.status(500).send("Error fetching user");
        }
      });


      export const addUserInteraction = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          const userId = req.body.userId;
          const userInteraction = req.body.userInteraction;

          await firestore.addUserInteraction(userId, userInteraction);
          res.status(200).send("User interaction added successfully");
        } catch (error) {
          console.error("Error adding user interaction:", error);
          res.status(500).send("Error adding user interaction");
        }
      });

      export const getUserInteractions = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          const userId = req.body.userId;
          const searchTag = req.body.searchTag || null;
          const interactions = await firestore.getUserInteractions(userId, req.body.fromDate || null, req.body.toDate || null, searchTag);
    
          if (interactions) {
            res.status(200).json(interactions);
          } else {
            res.status(404).send("No interactions found for user");
          }
        } catch (error) {
          console.error("Error fetching user interactions:", error);
          res.status(500).send("Error fetching user interactions");
        }
      });

      export const saveUserStudy = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          const userId = req.body.userId;
          const studyName = req.body.studyName;
          const studyContent = req.body.studyContent;
          const lockStudy = req.body.lockStudy || false;
    
          await firestore.saveUserStudy(userId, studyName, studyContent, lockStudy);
          res.status(200).send("User study saved successfully");
        } catch (error) {
          console.error("Error saving user study:", error);
          res.status(500).send("Error saving user study");
        }

      });


      export const lockUserStudy = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);
      
        try {
          const { userId, studyId, lock } = req.body;
      
          await firestore.lockUserStudy(userId, studyId, lock);
          res.status(200).send(`Study ${lock ? 'locked' : 'unlocked'} successfully`);
        } catch (error) {
          console.error("Error locking user study:", error);
          res.status(500).send("Error locking user study");
        }
      });

      export const getUserStudies = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);
      
        try {
          const userId = req.body.userId;
          const studies = await firestore.getUserStudies(userId);
      
          if (!studies.length) {
            res.status(404).send("No studies found");
          } else {
            res.status(200).json(studies);
          }
        } catch (error) {
          console.error("Error retrieving user studies:", error);
          res.status(500).send("Error retrieving user studies");
        }
      });
      

