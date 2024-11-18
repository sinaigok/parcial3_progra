import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { collectionData, Firestore, collection, addDoc, doc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root', // Asegúrate de que DatabaseService se provee en la raíz
})
export class DatabaseService {
  constructor(
    private firestore: Firestore,
  //  private http: HttpClient
  ) {} // Inyección correcta de HttpClient

 // fetchLocalCollection(collection: string): Observable<any> {
   
    // return this.http.get('db/' + collection + '.json');
 // }

  fetchFirestoreCollection(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }); // Retorna los datos incluyendo el ID
  }

  // Método para agregar un documento a una colección en Firestore
  addFirestoreDocument(collectionName: string, data: any): Promise<any> {
    const collectionRef = collection(this.firestore, collectionName);
    return addDoc(collectionRef, data);  // Añade un nuevo documento con los datos proporcionados
  }

  // Método para actualizar un documento existente en una colección en Firestore
  updateFirestoreDocument(collectionName: string, uuid: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${uuid}`);
    return updateDoc(docRef, data);  // Actualiza el documento con los datos proporcionados
  }

  // Método para eliminar un documento de una colección en Firestore
  deleteFirestoreDocument(collectionName: string, uuid: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${uuid}`);
    return deleteDoc(docRef);  // Elimina el documento con el UUID proporcionado
  }
}
