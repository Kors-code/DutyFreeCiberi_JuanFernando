import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './pages/config/config.component';
import { CumplimientoComponent } from './pages/cumplimiento/cumplimiento.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { DataBaseComponent } from './pages/data-base/data-base.component';
import { ElectronicaComponent } from './pages/electronica/electronica.component';
import { HomeComponent } from './pages/home/home.component';
import { ImportarInfoComponent } from './pages/importar-info/importar-info.component';
import { LoginComponent } from './pages/login/login.component';
import { MetasComponent } from './pages/metas/metas.component';
import { OperacionComponent } from './pages/operaciones/operacion.component';
import { SiigoComponent } from './pages/siigo-conection/siigo.component';
import { tomaInventarioComponent } from './pages/toma-inventario/toma-inventario.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },{
    component:LoginComponent,
    path:'Pass'
  },{
    component:UsersComponent,
    path:'Users'
  },
  {
    component:ConfigComponent,
    path:'Configuracion'
  },
  {
    component: ImportarInfoComponent,
    path:'import-Data'
  },
  {
    component: DataBaseComponent,
    path:'Data-Base'
  },{
    component:DashBoardComponent,
    path:'Dash-Board'
  },{
    component:MetasComponent,
    path: 'Metas-Presupuestos'
  },{
    component:SiigoComponent,
    path: 'Siigo-conection'
  },{
    component:CumplimientoComponent,
    path: 'Cumplimieto', 
  },{
    component:tomaInventarioComponent,
    path: 'inventarios', 
  },{
    component:OperacionComponent,
    path: 'Operaciones', 
  },{
    component:ElectronicaComponent,
    path: 'Electronica', 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
