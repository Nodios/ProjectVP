import {Component, provide} from 'angular2/core';
import {HTTP_PROVIDERS, XHRBackend} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import 'rxjs/Rx'; //load full rxjs

//Import needed components
import {MainComponent} from './main/main';

@Component({
    selector: 'earthquake-app',
    templateUrl: '',
    styleUrls: [],
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        //TODO add services
    ]
})

@RouteConfig([
    {path: '/', name: 'Main', component: MainComponent, useAsDefault: true},
    {path: '/earthquakes/...', name: 'Earthquakes', component: EarthquakesComponent},
    {path: '/significant', name: 'Significant', component: SignificantComponent}
])

export class AppComponent{
    public menuItems = [
        {caption: 'Earthquakes', link:['Earthquakes']},
        {caption: 'Significant', link:['Significant']}
    ];

    //TODO: inject into constructor
    constructor(){

    }
}