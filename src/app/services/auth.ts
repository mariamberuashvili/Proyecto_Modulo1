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
  ): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (e: any) {
      alert(
        `Código: ${e.code}\n\nMensaje: ${e.message}`
      );
      console.error(e);
      throw e;
    }
  }

  async login(
    { email, password }: { email: string; password: string }
  ): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e: any) {
      alert(
        `Código: ${e.code}\n\nMensaje: ${e.message}`
      );
      console.error(e);
      throw e;
    }
  }

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }
}