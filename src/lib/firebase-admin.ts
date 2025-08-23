import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;

/**
 * Initialize Firebase Admin SDK for server-side operations
 * Uses service account key or default credentials
 */
export function getAdminApp(): App {
  if (adminApp) {
    return adminApp;
  }

  // Check if app is already initialized
  if (getApps().length > 0) {
    adminApp = getApps()[0];
    return adminApp;
  }

  try {
    // Try to use service account key if available
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccount) {
      // Parse service account key from environment
      const serviceAccountKey = JSON.parse(serviceAccount);
      adminApp = initializeApp({
        credential: cert(serviceAccountKey),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      });
    } else {
      // Use default credentials (works in Google Cloud environments)
      adminApp = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      });
    }
    
    return adminApp;
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw new Error('Firebase Admin initialization failed. Check your credentials.');
  }
}

/**
 * Get Firebase Admin Auth instance
 */
export function getAdminAuth() {
  return getAuth(getAdminApp());
}

/**
 * Get Firebase Admin Firestore instance
 */
export function getAdminFirestore() {
  return getFirestore(getAdminApp());
}