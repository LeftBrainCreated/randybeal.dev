import {v4 as uuidv4} from 'uuid';
import { Injectable } from '@angular/core';
import { UserRef } from '../interfaces/userRef.js';
// import { initializeApp } from 'firebase/app';
// import { Firestore, getFirestore, collection, addDoc, query, where, getDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { Firestore, QuerySnapshot, FieldValue } from "@google-cloud/firestore";
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

    return userProfile.id; // Return the Firestore document ID
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
    if (user) {
      return user;
    }
    throw new Error("User not found");

  }

  async addUserInteraction(
    userId: string,
    interaction: {
      date: Date;
      summary: string;
      scriptureFocus: string[];
      notes: string;
    }
  ): Promise<void> {
    const docRef = faithfulDbConfig.collection("users").doc(userId);
  
    const snap = await docRef.get();
    if (!snap.exists) {
      throw new Error(`User ${userId} not found`);
    }
  
    await docRef.update({
      interactionLog: FieldValue.arrayUnion(interaction)
    });
  }

  async getUserInteractions(userId: string, fromDate: Date = new Date('Jan 1, 1900'), toDate: Date = new Date()): Promise<any[]> {
    const user = await this.fetchUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const interactionLog = user.interactionLog || [];
    const filteredInteractions = interactionLog.filter(interaction => {
      const interactionDate = new Date(interaction.date);
      return interactionDate >= fromDate && interactionDate <= toDate;
    });

    return filteredInteractions.map(interaction => ({
      date: interaction.date,
      summary: interaction.summary,
      scriptureFocus: interaction.scriptureFocus,
      notes: interaction.notes
    }));
  }

  async saveUserStudy(userId: string, studyName: string, studyContent: UserStudy): Promise<void> {
    const savedStudiesRef = faithfulDbConfig.collection("user_studies").doc(userId);
  
    await savedStudiesRef.collection(studyContent.studyId).add({
      studyName: studyName,
      createdDate: new Date().toISOString(),
      studyContent: studyContent
    });
  
    console.log("User study saved successfully:", studyName);
    return;
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
