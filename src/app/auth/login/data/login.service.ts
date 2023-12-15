import { Injectable, computed, inject, signal } from '@angular/core';
import { Client, Account } from 'appwrite';
import { connect } from 'ngxtension/connect';
import { EMPTY, Subject, catchError, map, merge, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/data/auth.service';
import { Credentials } from 'src/app/shared/types/credentials';
import { LoginState } from 'src/app/shared/types/login';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // dependencies
  // private authService = inject(AuthService);
  // private readonly client = new Client()
  //   .setEndpoint(environment.endpoint)
  //   .setProject(environment.projectId)
  // private readonly account = new Account(this.client);


  // error$ = new Subject<any>();
  // login$ = new Subject<Credentials>();

  // // userAuthenticated$ = this.login$.pipe(
  // //   switchMap((credentials) =>
  // //     this.authService.login(credentials).pipe(
  // //       catchError((err) => {
  // //         this.error$.next(err);
  // //         return EMPTY;
  // //       })
  // //     )
  // //   )
  // // );

  // private state = signal<LoginState>({
  //   status: 'pending',
  // });

  // status = computed(() => this.state().status);

  // constructor() {
  //   const nextState$ = merge(
  //     this.userAuthenticated$.pipe(map(() => ({ status: 'success' as const }))),
  //     this.login$.pipe(map(() => ({ status: 'authenticating' as const }))),
  //     this.error$.pipe(map(() => ({ status: 'error' as const })))
  //   );

  //   connect(this.state).with(nextState$);
  // }
}