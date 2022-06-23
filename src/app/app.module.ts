import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavComponent } from './pages/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { ConfigComponent } from './pages/config/config.component';
import { DialogConfirm } from './pages/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImportarInfoComponent } from './pages/importar-info/importar-info.component';
import { DataBaseComponent, DialogDataJson } from './pages/data-base/data-base.component';
import { DashBoardComponent, DialogDataVendedor } from './pages/dash-board/dash-board.component';
import { MetasComponent } from './pages/metas/metas.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgJsonEditorModule } from 'ang-jsoneditor' ;
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SiigoComponent } from './pages/siigo-conection/siigo.component';
import { CumplimientoComponent } from './pages/cumplimiento/cumplimiento.component';
import { DialogConteoDetail, tomaInventarioComponent } from './pages/toma-inventario/toma-inventario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    ConfigComponent,
    DialogConfirm,
    DialogDataJson,
    ImportarInfoComponent,
    DataBaseComponent,
    DashBoardComponent,
    MetasComponent,
    SiigoComponent,
    DialogDataVendedor,
    CumplimientoComponent,
    tomaInventarioComponent,
    DialogConteoDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxJsonViewerModule,
    NgJsonEditorModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DialogConfirm, DialogDataJson, DialogDataVendedor,
    DialogConteoDetail]
})
export class AppModule { }
