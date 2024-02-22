import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  baseUri = "ws://localhost:8000";
  private clientSocket: any;
  constructor() {
    // this.clientSocket = socketIo.connect(this.baseUri);
  }

  listen(connection: string): Observable<any> {
    return new Observable((subscribe) => {
      this.clientSocket.on(connection, (data: any) => {
        subscribe.next(data);
      })
    })
  }

  emit(event: string, data: any) {

    this.clientSocket.emit(event, data)

  }
}
