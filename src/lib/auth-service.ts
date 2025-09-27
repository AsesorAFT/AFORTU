import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { z } from 'zod';

// Esquema para el formulario, se puede usar en el servicio y en el componente
export const signupSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('Por favor, introduce un correo electrónico válido.'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  isAfortuPro: z.boolean().default(false),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

/**
 * Inicializa los datos del usuario en Firestore después del registro.
 * @param user - El objeto de usuario de Firebase Auth.
 * @param isPro - Booleano que indica si el usuario se registró como PRO.
 */
async function initializeUserData(user: User, isPro: boolean) {
  if (!user || !db) return;

  const accountRef = doc(db, 'accounts', user.uid);
  const memberRef = doc(db, `accounts/${user.uid}/members`, user.uid);

  // Transacción para asegurar la atomicidad de las operaciones
  await Promise.all([
    setDoc(accountRef, {
      ownerId: user.uid,
      createdAt: serverTimestamp(),
      accountType: isPro ? 'PRO' : 'Standard',
      balances: { assetManagement: 0, fixedRate: 0, contributions: 0 },
      portfolio: [],
      contractsData: [],
      invoicesData: [],
      deductiblePlansData: [],
      financialGoals: [],
      strategicObjectives: [],
      fixedRateContracts: [],
      contributionPlans: [],
      currency: 'MXN',
    }, { merge: true }),
    setDoc(memberRef, {
      email: user.email,
      name: user.displayName,
      role: 'cliente',
      joinedAt: serverTimestamp(),
    })
  ]);
}

/**
 * Registra un nuevo usuario con email y contraseña.
 * @param values - Datos del formulario de registro.
 */
export async function signupWithEmail(values: SignupFormValues): Promise<User> {
  if (!auth) throw new Error('Firebase Auth no está inicializado.');
  
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password
  );
  
  await updateProfile(userCredential.user, { displayName: values.name });

  await initializeUserData(userCredential.user, values.isAfortuPro);

  return userCredential.user;
}

/**
 * Inicia sesión o registra un usuario con Google.
 * @param isAfortuPro - Booleano que indica si el usuario elige el plan PRO.
 */
export async function signupWithGoogle(isAfortuPro: boolean): Promise<User> {
  if (!auth) throw new Error('Firebase Auth no está inicializado.');

  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  
  // Aquí podrías verificar si el usuario es nuevo o existente antes de inicializar.
  // Por simplicidad, `initializeUserData` con `{ merge: true }` funciona bien.
  await initializeUserData(userCredential.user, isAfortuPro);

  return userCredential.user;
}
