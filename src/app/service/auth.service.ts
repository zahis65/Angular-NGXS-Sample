import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseConf} from '../config/base.conf';
import {Store} from '@ngxs/store';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private store: Store) {
  }

  public authenticate(username: string, password: string): Promise<object> {
    return this.http.put(
      `${BaseConf.ressourceUrl}auth/`,
      {username: username, password: password},
    ).toPromise();
  }

  public checkToken(token: string): Promise<object> {
    return this.http.get(
      `${BaseConf.ressourceUrl}auth/`,
      {
        headers: new HttpHeaders().set('Authorization', `${token}`)
      }
    ).toPromise();
  }

  public checkIfLogged(): boolean {
    return this.store.selectSnapshot((state => state.loggedInfo.isLogged));
  }

}