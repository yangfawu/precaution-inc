import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { PageAnchorComponent } from './components/page-anchor/page-anchor.component';
import { NavAnchorComponent } from './components/nav-anchor/nav-anchor.component';
import { NavGroupComponent } from './components/nav-group/nav-group.component';
import { ResourcesPageComponent } from './components/resources-page/resources-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExternalInfoComponent } from './components/external-info/external-info.component';
import { TipsSearchComponent } from './components/tips-search/tips-search.component';
import { QuantifyPipe } from './pipes/quantify.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScamFrameComponent } from './components/scam-frame/scam-frame.component';
import { MicrosoftScamPageComponent } from './components/microsoft-scam-page/microsoft-scam-page.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { NigerianPrinceScamPageComponent } from './components/nigerian-prince-scam-page/nigerian-prince-scam-page.component';
import { RandNumPipe } from './pipes/rand-num.pipe';
import { EllipsisModule } from 'ngx-ellipsis';
import { TimeagoModule } from 'ngx-timeago';
import { NigerianPrinceScamMessageComponent } from './components/nigerian-prince-scam-message/nigerian-prince-scam-message.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { GameCurrencyScamPageComponent } from './components/game-currency-scam-page/game-currency-scam-page.component';
import { UnexpectedPrizeScamPageComponent } from './components/unexpected-prize-scam-page/unexpected-prize-scam-page.component';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        FooterComponent,
        MainFrameComponent,
        PageAnchorComponent,
        NavAnchorComponent,
        NavGroupComponent,
        ResourcesPageComponent,
        NotFoundComponent,
        ExternalInfoComponent,
        TipsSearchComponent,
        QuantifyPipe,
        ScamFrameComponent,
        MicrosoftScamPageComponent,
        InfoBoxComponent,
        NigerianPrinceScamPageComponent,
        RandNumPipe,
        NigerianPrinceScamMessageComponent,
        GameCurrencyScamPageComponent,
        UnexpectedPrizeScamPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        EllipsisModule,
        TimeagoModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
