import OpenAI from 'openai';
import dotenv from 'dotenv';
import {onRequest} from "firebase-functions/v2/https";
import  { gitHistContent } from './assets/git-hist.js';
import { Resume } from './assets/resume.js';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import { UserRef } from './app/interfaces/userRef.js';
import { Firestore } from "@google-cloud/firestore";
import { UserStudy } from './app/interfaces/userStudy.js';

import { faithfulGuideTools } from './tools.js';

// import { FirestoreService } from './app/services/firestore.service.js';
import cors from 'cors';


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

  const failthfulGuideClient = new OpenAI({
    organization: 'org-1dyYGmSIg0Nv390v9hIqIOgd',
    project: 'proj_WhMLRuB95inkkOJqKt2Pohzc',
    apiKey: apiKey, 
  });



// const firestore = new FirestoreService();
const faithfulDbConfig = new Firestore({
  projectId: 'randybeal-dev',
  keyFilename: 'secure/adminsdk.json',
  databaseId: 'faithful-guide'
})

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
        // Check token in common locations: header, query, body
        let token = null;
    
        // 1. Try Authorization header
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
          token = authHeader.split(' ')[1];
        }
    
        // 2. Fallback to token in query params
        if (!token && req.query?.token) {
          token = req.query.token;
        }
    
        // 3. Fallback to token in body
        if (!token && req.body?.token) {
          token = req.body.token;
        }
    
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

    export const faithfulGuide = onRequest((req: any, res: any) => {
      corsHandler(req, res, async () => {
        try {
          res.set('Access-Control-Allow-Origin', origin);
          res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
          res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
          if (req.method === 'OPTIONS') {
            res.status(204).send('No Content');
            return;
          }
    
          const prompt = req.body.prompt;
          console.log("Prompt: " + prompt);
    
          const completion = await failthfulGuideClient.chat.completions.create({
            model: "gpt-4o",
            stream: true,
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
            tools: faithfulGuideTools,
            temperature: 1,
              max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
    
          res.send({
            "status": "success",
            "data": completion.choices[0].message
          });
        } catch (ex: any) {
          console.error("Error in faithfulGuide function:", ex);
          res.status(500).send(ex.message || 'Internal Server Error');
        }
      })
    });

    export const authGpt = onRequest((req: any, res: any) => {
      const apiKey = req.headers['x-api-key']; 
    
      if (!apiKey || apiKey !== process.env.GPT_SECRET) {
        res.status(401).send('Unauthorized: Missing or invalid API key');
        return;
      }
    
      const payload = { user: 'apikey' };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
    
      res.json({ token });
    });

      export const getUserObjectStructure = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          res.send(getUserObjectStructure_bak);
        } catch (error) {
          console.error("Error fetching user object structure:", error);
          res.status(500).send("Error fetching user object structure");
        }
      });

      export const createUser = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);

        try {
          const userProfile: UserRef = req.body.userProfile;
    
          const createdUserId = await createUser_bak(userProfile);
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
    
          await updateUser_bak(userId, userProfile);
          res.status(200).send("User updated successfully");
        } catch (error) {
          console.error("Error updating user:", error);
          res.status(500).send("Error updating user");
        }
      });


      export const getUserById = onRequest(async (req: any, res: any) => {
        await authenticateToken(req, res);  

        try {
          const userId = req.body.userId;
          const user = await getUserById_bak(userId);
    
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
          const userId = req.body.userId || req.query.userId;
          const userInteraction = req.body.userInteraction || {
            date: req.body.date,
            summary: req.body.summary,
            scriptureFocus: req.body.scriptureFocus,
            notes: req.body.notes,
            tags: req.body.tags || [],
          };
      
          if (!userId || !userInteraction || !userInteraction.date) {
            throw new Error("Missing required fields: userId or userInteraction");
          }
          
          await addUserInteraction_bak(userId, userInteraction);
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
          const interactions = await getUserInteractions_bak(userId, req.body.fromDate || null, req.body.toDate || null, searchTag);
    
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
    
          await saveUserStudy_bak(userId, studyName, studyContent, lockStudy);
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
      
          await lockUserStudy_bak(userId, studyId, lock);
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
          const studies = await getUserStudies_bak(userId);
      
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
      

      const getUserObjectStructure_bak = {
      "userId": "string uuid",  
      "userCreatedDate": "ISODate",
      "profile": {
        "personal_details": {
          "preferredName": "string",
          "age": "number",
          "occupation": "string"
        },
        "immediate_contacts": [
          {
            "name": "string",
            "relationship": "string (e.g. spouse, friend, coworker)",
            "frequency": "string (e.g. daily, weekly, monthly)", 
          }
        ],
        "spiritual_background": {
          "faith_maturity": "string (e.g., new believer, mature believer)",
          "bible_knowledge": "string (e.g., beginner, intermediate, advanced)",
          "church_involvement": "string (e.g., active member, occasional attendee)",
          "preferred_study_style": "string (e.g., group study, solo study)",
        },
        "goals_and_concerns": {
          "short_term_goals": ["string"],
          "long_term_goals": ["string"],
          "immediate_worries": ["string"],
          "long_term_worries": ["string"]
        },
        "study_preferences": {
          "session_length": "string (default 15 minutes)",
          "preferred_time": "string (e.g., morning, afternoon, evening)",
          "frequency": "string (default daily)",
        }
      },
      "interaction_log": [
        {
          "date": "ISODate",
          "summary": "string",
          "scripture_focus": ["string"], 
          "notes": "string" 
        }
      ],
  }

  const createUser_bak: any = async (userProfile: any): Promise<string> => {
    // const userDocRef = faithfulDbConfig.collection("users").doc();
    let userId = uuidv4();
    let userCreatedDate = new Date().toISOString();

    await faithfulDbConfig.collection("users").doc(userId).set({
      userId: userId,
      userCreatedDate: userCreatedDate,
      ...userProfile,
      interactionLog: []
    }, { merge: true });

    console.log("User created/updated successfully:", userProfile.id);
    console.log("User data:", userProfile);

    return userId
  }

  const updateUser_bak: any = async (
    userId: string,
    userProfile: Partial<UserRef>
  ): Promise<string> => {
    const userSnap = await faithfulDbConfig.collection("users").doc(userId).get();
  
    if (!userSnap.exists) {
      throw new Error("User not found");
    }
  
    // Grab the DocumentReference
    const docRef = userSnap.ref;
  
    await docRef.set(
      { profile: userProfile.profile },
      { merge: true }
    );

    return "done";
  }
  

  const getUserById_bak: any = async (userId: string): Promise<any> => {
    let user = await fetchUserById(userId);
    return user;
  }

  const addUserInteraction_bak: any = async (
    userId: string,
    interaction: {
      date: Date;
      summary: string;
      scriptureFocus: string[];
      notes: string;
      tags?: string[];
    }
  ): Promise<void> => {
    const userRef = faithfulDbConfig.collection("users").doc(userId);
    const userSnap = await userRef.get();
  
    if (!userSnap.exists) {
      throw new Error(`User ${userId} not found`);
    }
  
    const interactionsRef = userRef.collection("interactions");
    const interactionsSnap = await interactionsRef
      .orderBy("date", "asc")
      .get();
  
    let interactionDocRef;
  
    // max 30
    if (interactionsSnap.size >= 30) {
      const oldestDoc = interactionsSnap.docs[0];
      interactionDocRef = interactionsRef.doc(oldestDoc.id);
      console.log(`Overwriting oldest interaction: ${oldestDoc.id}`);
    } else {
      const interactionId = uuidv4();
      interactionDocRef = interactionsRef.doc(interactionId);
      console.log(`Creating new interaction: ${interactionId}`);
    }
  
    await interactionDocRef.set({
      ...interaction,
      tags: interaction.tags || [],
    });
  }
  

  const getUserInteractions_bak: any = async (
    userId: string,
    fromDate?: Date,
    toDate?: Date,
    tag?: string
  ): Promise<any[]> => {
    const userRef = faithfulDbConfig.collection("users").doc(userId);
    const userSnap = await userRef.get();
  
    if (!userSnap.exists) {
      throw new Error(`User ${userId} not found`);
    }
  
    let query = userRef
      .collection("interactions")
      .orderBy("date", "desc")
      ;
  
    if (tag) {
      query = query.where("tags", "array-contains", tag);
    }
  
    const interactionSnap = await query.get();

    const filteredInteractions: any = interactionSnap.docs
    .map(doc => {
      const data = doc.data();
      return {
        ...data,
      };
    })
    .filter(item => {
      return new Date(item.date) >= (fromDate ?? new Date("1900-01-01")) 
          && new Date(item.date) <= (toDate ?? new Date())
          && (tag ? item.tags && item.tags.includes(tag) : true);
    });
  
    if (!filteredInteractions) {
      return [];
    }

    return filteredInteractions;
  }
  
  const saveUserStudy_bak: any = async (
    userId: string,
    studyName: string,
    studyContent: string,
    lock: boolean
  ): Promise<void> => {
    const userStudyRef = faithfulDbConfig
      .collection("user_studies")
      .doc(userId)
      .collection("studies");
  
    const newStudy: UserStudy = {
      studyId: uuidv4(),
      studyName,
      createdDate: new Date(),
      studyContent,
      lock
    };
  
    await userStudyRef.doc(newStudy.studyId).set(newStudy);
  
    // Clean up logic: Keep only last 10 unlocked studies
    const allStudiesSnap = await userStudyRef
      .where("lock", "==", false)
      .orderBy("createdDate", "desc")
      .get();
  
    if (allStudiesSnap.size > 10) {
      const toDelete = allStudiesSnap.docs.slice(10); // older than top 10
      for (const doc of toDelete) {
        await doc.ref.delete();
      }
    }
  
    console.log(`User study "${studyName}" saved (locked: ${lock})`);
  }
  

  const lockUserStudy_bak: any = async (userId: string, studyId: string, lock: boolean): Promise<void> => {
    const studyRef = faithfulDbConfig
      .collection("user_studies")
      .doc(userId)
      .collection("studies")
      .doc(studyId);
  
    const studySnap = await studyRef.get();
    if (!studySnap.exists) {
      throw new Error("Study not found");
    }
  
    await studyRef.update({ lock });
  }
  

  const getUserStudies_bak: any = async (userId: string): Promise<UserStudy[]> => {
    const studiesRef = faithfulDbConfig
      .collection("user_studies")
      .doc(userId)
      .collection("studies")
      .orderBy("createdDate", "desc");
  
    const snapshot = await studiesRef.get();
  
    return snapshot.docs.map(doc => doc.data() as UserStudy);
  }
  
  
  //------------------------------------------------------------------------------------
  // Private methods
  //------------------------------------------------------------------------------------
  const fetchUserById: any = async (
    userId: string
  ): Promise<UserRef | undefined> => {
    const qSnap = await faithfulDbConfig
      .collection("users")
      .where("userId", "==", userId)
      .limit(1)
      .get();
  
    if (qSnap.empty) return undefined;
  
    // Pull out only the data
    return qSnap.docs[0].data() as UserRef;
  }

