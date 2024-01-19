import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GameCurrencyScamPageComponent } from './components/game-currency-scam-page/game-currency-scam-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MicrosoftScamPageComponent } from './components/microsoft-scam-page/microsoft-scam-page.component';
import { NigerianPrinceScamPageComponent } from './components/nigerian-prince-scam-page/nigerian-prince-scam-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResourcesPageComponent } from './components/resources-page/resources-page.component';
import { UnexpectedPrizeScamPageComponent } from './components/unexpected-prize-scam-page/unexpected-prize-scam-page.component';

const routes: Routes = [
    { path: '', component: MainPageComponent, pathMatch: 'full' },
    { path: environment.paths.MICROSOFT, component: MicrosoftScamPageComponent, pathMatch: 'full' },
    { path: environment.paths.NIGERIAN_PRINCE, component: NigerianPrinceScamPageComponent, pathMatch: 'full' },
    { path: environment.paths.RESOURCES, component: ResourcesPageComponent, pathMatch: 'full' },
    { path: environment.paths.GAME_CURRENCY, component: GameCurrencyScamPageComponent, pathMatch: 'full' },
    { path: environment.paths.UNEXPECTED_PRIZE, component: UnexpectedPrizeScamPageComponent, pathMatch: 'full' },

    { path: '404', component: NotFoundComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
