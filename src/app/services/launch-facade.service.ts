import { LaunchListState } from "./../store/reducers/launch-list.reducer";
import { map,switchMap} from "rxjs/operators";
import { PastLaunchesListGQL } from "./spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadLaunchList } from "../store/actions";
import * as launchListQuery from "../store/selectors";
//import { LaunchDetailsGQL } from "../services/spacexGraphql.service";
//import { ActivatedRoute } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class LaunchFacadeService {
  launchListState$ = this.store.select(launchListQuery.getLaunchListState);
  launchList$ = this.store.select(launchListQuery.getLaunchList);
  launchListLoaded$ = this.store.select(launchListQuery.getLaunchListLoaded);
  launchListLoading$ = this.store.select(launchListQuery.getLaunchListLoading);
  
  constructor(
    private readonly store: Store<LaunchListState>,
    private readonly pastLaunchesService: PastLaunchesListGQL,
    //private readonly launchDetailsService: LaunchDetailsGQL,
    //private readonly route: ActivatedRoute,
    ) {}

  pastLaunchListStoreCache() {
    this.store.dispatch(loadLaunchList());
    return this.launchList$;
  }

  pastLaunchListFacade() {
    return this.pastLaunchesService
      .fetch({ limit: 30 })
      .pipe(map(res => res.data.launchesPast));
  }
  //pastLaunchDetails() {
  //  return this.route.paramMap.pipe(
  //  map(params => params.get("id") as string),
  //  switchMap(id => this.launchDetailsService.fetch({ id })),
  //  map(res => res.data.launch)
  //  );
  //} 
  
}
