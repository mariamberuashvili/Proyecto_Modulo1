import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChuletonService {
  constructor(private firestore: Firestore) {}

 
  addChuleton(item: any) {
    const ref = collection(this.firestore, 'chuletones');
    return addDoc(ref, item);
  }

  
  getChuletones(): Observable<any[]> {
    const ref = collection(this.firestore, 'chuletones');
    return collectionData(ref, { idField: 'id' });
  }

 
  deleteChuleton(id: string) {
    const ref = doc(this.firestore, `chuletones/${id}`);
    return deleteDoc(ref);
  }
}