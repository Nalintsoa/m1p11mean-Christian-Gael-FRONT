import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  baseUri = "http://localhost:8000";
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
}
