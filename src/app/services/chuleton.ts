import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chuleton } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class ChuletonService {
  constructor(private firestore: Firestore) {}

 
  addChuleton(item: Chuleton) {
    const ref = collection(this.firestore, 'chuletones');
    return addDoc(ref, item);
  }

  
getChuletones(): Observable<Chuleton[]> {
  const ref = collection(this.firestore, 'chuletones');
  return collectionData(ref, { idField: 'id' }) as Observable<Chuleton[]>;
}
 
  deleteChuleton(id: string) {
    const ref = doc(this.firestore, `chuletones/${id}`);
    return deleteDoc(ref);
  }
}