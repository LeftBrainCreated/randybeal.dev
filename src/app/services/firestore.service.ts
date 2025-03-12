
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, query, where, getDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBl2XEsAm6fCIKqsRGoI8_Cw3HZbnvZhBc",
  authDomain: "randybeal-dev.firebaseapp.com",
  projectId: "randybeal-dev",
  storageBucket: "randybeal-dev.firebasestorage.app",
  messagingSenderId: "502721544635",
  appId: "1:502721544635:web:9296f6d1ce46d7cd06849e",
  measurementId: "G-8PT0F3465B"
};

// ✅ Initialize Firebase and Firestore here (without modifying app bootstrap)
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() {}

  getFirestoreInstance(): Firestore {
    return firestore;
  }

  private db: Firestore = firestore; // Use locally initialized Firestore instance


  // Create a student invitation record
  async createStudentRecord(studentName: string, code: string): Promise<string> {
    const studentRef = collection(this.db, 'students');

    // Convert studentName to lowercase for case-insensitive search
    const lowerCaseName = studentName.toLowerCase();

    // Query Firestore for an existing student with the same name (case-insensitive)
    const q = query(studentRef, where("studentNameLower", "==", lowerCaseName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("A student with this name already exists.");
    }

    // If no duplicate, add the new student
    const docRef = await addDoc(studentRef, { 
      studentName, 
      studentNameLower: lowerCaseName, // Store lowercase name for future queries
      code, 
      invited: '' 
    });

    return docRef.id; // Return the Firestore document ID
  }

  // Get student record by code
  async getStudentByCode(code: string) {
    const studentRef = collection(this.db, 'students');
    const docSnap = (await getDoc(doc(studentRef, code))).data();
    return docSnap;
  }

  // Update student record with invited person's name
  async updateInvitation(code: string, invitedName: string) {
    console.log(`Searching for student with code: ${code}`);

    const studentRef = collection(this.db, 'students');
    const q = query(studentRef, where("code", "==", code)); // ✅ Query Firestore for the document

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        throw new Error("No student found with this code.");
    }

    // ✅ Get the first matching document ID
    const studentDocId = querySnapshot.docs[0].id;
    console.log(`Updating document ID: ${studentDocId}`);

    const studentDocRef = doc(this.db, 'students', studentDocId);
    await updateDoc(studentDocRef, { invited: invitedName });

    console.log("Invitation updated successfully.");
}
}
