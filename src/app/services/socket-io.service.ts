import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { API_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  baseUri = API_URL;
  private clientSocket: any;
  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.clientSocket = socketIo.connect(this.baseUri);
    })
  }

  listen(connection: string): Observable<any> {
    return new Observable((subscribe) => {
      this.clientSocket.on(connection, (data: any) => {
        subscribe.next(data);
      });

    })
  }

  disconnect() {
    return this.clientSocket.disconnect();
  }
  emit(event: string, data: any) {

    this.clientSocket.emit(event, data)

  }
}
