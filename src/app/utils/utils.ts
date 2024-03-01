import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  fireBaseTimeStamp(): Timestamp {
    const now = new Date();
    const timestamp = Timestamp.fromDate(now);
    return new Timestamp(timestamp.seconds, timestamp.nanoseconds)
  }
}