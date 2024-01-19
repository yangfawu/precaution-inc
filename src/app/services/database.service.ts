import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    constructor(
        private fireDb: AngularFireDatabase
    ) { }

    appendEmail(email: string, onComplete = () => void(0), onError = (err: any) => void(0)) {
        this.fireDb.list<string>("/emails")
            .push(email)
            .then(() => { if (onComplete) onComplete() })
            .catch(err => { if (onError) onError(err) })
    }

}
