import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FetchService } from 'src/app/services/fetch.service';
import { External } from 'src/app/structures/external';

@Component({
    selector: 'app-resources-page',
    templateUrl: './resources-page.component.html',
    styleUrls: ['./resources-page.component.scss']
})
export class ResourcesPageComponent { }
