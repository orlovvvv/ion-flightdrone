import { Injectable, inject } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  EMPTY,
  Observable,
  Subject,
  asapScheduler,
  catchError,
  map,
  merge,
  scheduled,
  switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { environment } from 'src/environments/environment';
import { APPWRITE } from 'src/main';
import {
  AddProfile,
  EditProfile,
  Profile,
  ProfileState,
} from '../types/profile';
import { RemoveProfile } from './../types/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // dependencies
  private appwrite = inject(APPWRITE);
  private authService = inject(AuthService);

  // initial state
  private initialState: ProfileState = {
    profile: undefined,
    loaded: false,
    error: null,
  };

  // sources
  private error$ = new Subject<Error>();
  private profileLoaded$ = scheduled(
    this.appwrite.database
      .getDocument(
        environment.databaseId,
        environment.profileCollectionId,
        this.authService.state().user?.$id!
      )
      .catch((err) => {
        this.error$.next(err);
        return null;
      }),
    asapScheduler
  ).pipe(map((document) => document as unknown as Profile));

  sources$ = merge(
    this.profileLoaded$.pipe(map((profile) => ({ profile, loaded: true }))),
    this.error$.pipe(map((error) => ({ error })))
  );

  // state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      add: (_, $: Observable<AddProfile>) =>
        $.pipe(
          switchMap((profile) =>
            scheduled(
              this.appwrite.database
                .createDocument(
                  environment.databaseId,
                  environment.profileCollectionId,
                  this.authService.state().user?.$id!,
                  profile
                )
                .catch((err) => err)
                .then((document) => ({ ...document } as unknown as Profile)),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err);
                return EMPTY;
              }),
              map((profile) => ({
                profile: { ..._().profile, ...profile },
                loaded: true,
              }))
            )
          )
        ),
      edit: (_, $: Observable<EditProfile>) =>
        $.pipe(
          switchMap((update) =>
            scheduled(
              this.appwrite.database
                .updateDocument(
                  environment.databaseId,
                  environment.profileCollectionId,
                  update.id,
                  update.data
                )
                .catch((err) => err)
                .then((document) => document as unknown as Profile),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err);
                return EMPTY;
              }),
              map((profile) => ({
                profile: { ..._().profile, ...profile },
              }))
            )
          )
        ),
      remove: (_, $: Observable<RemoveProfile>) =>
        $.pipe(
          switchMap((id) =>
            scheduled(
              this.appwrite.database
                .deleteDocument(
                  environment.databaseId,
                  environment.profileCollectionId,
                  id
                )
                .catch((err) => err)
                .then(() => id),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err);
                return EMPTY;
              }),
              map(() => ({ profile: undefined }))
            )
          )
        ),
    },
  });
}
