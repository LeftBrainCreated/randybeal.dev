import {v4 as uuidv4} from 'uuid';
import { Injectable } from '@angular/core';
import { UserRef } from '../interfaces/userRef.js';
// import { initializeApp } from 'firebase/app';
// import { Firestore, getFirestore, collection, addDoc, query, where, getDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { Firestore, QuerySnapshot } from "@google-cloud/firestore";
// import { merge } from 'rxjs';
import { UserStudy } from '../interfaces/userStudy.js';

const faithfulDbConfig = new Firestore({
  projectId: 'randybeal-dev',
  keyFilename: 'secure/adminsdk.json',
  databaseId: 'faithful-guide'
})

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() {}

  async getUsersCollection(): Promise<QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>> {
    const faithfulDb = await faithfulDbConfig.collection("users").get();
    console.log(faithfulDb.docs.map(d=>d.data()));

    return faithfulDb;
  }

  async getUserObjectStructure(): Promise<any> {
    return {
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
}

  async createUser(userProfile: any): Promise<string> {
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

  async updateUser(
    userId: string,
    userProfile: Partial<UserRef>
  ): Promise<string> {
    const userSnap = await faithfulDbConfig.collection("users").doc(userId).get();
  
    if (!userSnap.exists) {
      throw new Error("User not found");
    }
  
    // Grab the DocumentReference
    const docRef = userSnap.ref;
  
    // const updates: Record<string, any> = {};
    // if (userProfile.profile) {
    //   for (const [section, value] of Object.entries(userProfile.profile)) {
    //     updates[`profile.${section}`] = value;
    //   }
    // }
    
    // if (Object.keys(updates).length) {
    //   await docRef.update(updates);
    // }
 
    await docRef.set(
      { profile: userProfile.profile },
      { merge: true }
    );

    return "done";
  }
  

  async getUserById(userId: string): Promise<any> {
    let user = await this.fetchUserById(userId);
    return user;
  }

  async addUserInteraction(
    userId: string,
    interaction: {
      date: Date;
      summary: string;
      scriptureFocus: string[];
      notes: string;
      tags?: string[];
    }
  ): Promise<void> {
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
  

  async getUserInteractions(
    userId: string,
    fromDate?: Date,
    toDate?: Date,
    tag?: string
  ): Promise<any[]> {
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
  
  async saveUserStudy(
    userId: string,
    studyName: string,
    studyContent: string,
    lock: boolean
  ): Promise<void> {
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
  
  
  private async fetchUserById(
    userId: string
  ): Promise<UserRef | undefined> {
    const qSnap = await faithfulDbConfig
      .collection("users")
      .where("userId", "==", userId)
      .limit(1)
      .get();
  
    if (qSnap.empty) return undefined;
  
    // Pull out only the data
    return qSnap.docs[0].data() as UserRef;
  }
}
