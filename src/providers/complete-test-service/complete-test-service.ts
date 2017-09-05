import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

import { SharedParametersProvider } from "../../providers/shared-parameters/shared-parameters"

@Injectable()
export class CompleteTestServiceProvider implements AutoCompleteService {
  labelAttribute = "email";
  transferuser:any = {};

  constructor(private http:Http, public ctrSharedParametersProvider: SharedParametersProvider) {

  }
  getResults(keyword:string) {
    this.transferuser = this.ctrSharedParametersProvider.getTransferUser();

    var ctransferuser = [];

    ctransferuser = this.transferuser.filter(function(el){
      return el.email.toUpperCase().indexOf(keyword.toUpperCase()) > -1
    });

    return ctransferuser;
  }
}
