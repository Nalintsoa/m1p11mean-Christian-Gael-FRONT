import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socket from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;
  constructor() {
    this.socket = socket.connect("http://localhost:8000");
  }

  listen(event: string) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data)
      })
    })
  }

  emit(event: string, data: any) {

    this.socket.emit(event, data)

  }
}
