import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  async register(
    { email, password }: { email: string; password: string }
  ): Promise<UserCredential | null> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (e: unknown) {
      console.error('Register error:', e);
      return null;
    }
  }

  async login(
    { email, password }: { email: string; password: string }
  ): Promise<UserCredential | null> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e: unknown) {
      console.error('Firebase error:', e);
      return null;
    }
  }

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }
}