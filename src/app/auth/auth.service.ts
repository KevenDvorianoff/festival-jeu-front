import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, interval, Observable, of, Subscription } from 'rxjs';
import { delay, delayWhen, filter, map, tap } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';

const LOGIN_URL = `${API_URL}/auth/login`
const REFRESH_URL = `${API_URL}/auth/refresh`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectionState = new BehaviorSubject<'connected' | 'connecting' | 'disconnected'>('connecting');
  tokens = new BehaviorSubject<{ access_token: string, refresh_token: string } | null>(null);
  userInfos: Observable<{ id: number, isAdmin: boolean } | null>;

  private refreshSub: Subscription | null = null;

  constructor(
    private http: HttpClient
  ) {
    this.userInfos = this.tokens.pipe(map(value => {
      if (value) {
        const claims = this.decodeToken(value.access_token);
        return { id: claims.sub, isAdmin: claims.isAdmin };
      }
      return null;
    }));

    this.tokens.subscribe((value) => {
      if (value) {
        const refreshTime = this.decodeToken(value.access_token).exp * 1000 - new Date().getTime() - 1000;
        this.refreshSub = of(value.refresh_token).pipe(delay(refreshTime)).subscribe((value) => this.refresh(value));
      }
      else if (this.refreshSub !== null) {
        this.refreshSub.unsubscribe();
      }
    });

    const access_token = localStorage.getItem('access');
    const refresh_token = localStorage.getItem('refresh');

    if (refresh_token && access_token) {
      const decodedAccess = this.decodeToken(access_token);
      const decodedRefresh = this.decodeToken(refresh_token);
      if (this.isExpired(decodedAccess)) {
        if (this.isExpired(decodedRefresh)) {
          this.logout();
        }
        else {
          this.refresh(refresh_token);
        }
      }
      else {
        this.setCredentials({ access_token, refresh_token });
      }
    }
    else {
      this.logout();
    }
  }

  login(username: string, password: string) {
    this.connectionState.next('connecting');
    return this.http.post<{ access_token: string, refresh_token: string }>(LOGIN_URL, { username, password }).pipe(
      tap(
        result => this.setCredentials(result),
        () => this.logout()
      )
    )
  }

  logout() {
    this.connectionState.next('disconnected');
    this.tokens.next(null);
    localStorage.removeItem('refresh');
    localStorage.removeItem('access')
  }

  private setCredentials(credentials: { access_token: string, refresh_token: string }) {
    localStorage.setItem('access', credentials.access_token);
    localStorage.setItem('refresh', credentials.refresh_token);
    this.tokens.next(credentials);
    this.connectionState.next('connected');
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  private isExpired(decodedToken: any) {
    return decodedToken.exp * 1000 <= new Date().getTime();
  }

  private refresh(refreshToken: string) {
    this.http.post<{ access_token: string, refresh_token: string }>(REFRESH_URL, { refresh_token: refreshToken }).subscribe(
      (result) => this.setCredentials(result),
      () => this.logout()
    );
  }
}
