import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NologinGuard } from "./guards/nologin.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule', canActivate: [NologinGuard] },
  { path: 'registro', loadChildren: './componentes/registro/registro.module#RegistroPageModule', canActivate: [NologinGuard] },
  { path: 'recuperar', loadChildren: './componentes/recuperar/recuperar.module#RecuperarPageModule', canActivate: [NologinGuard] },
  { path: 'productos', loadChildren: './componentes/productos/productos.module#ProductosPageModule', canActivate: [AuthGuard] },
  { path: 'inventario', loadChildren: './componentes/inventario/inventario.module#InventarioPageModule',canActivate: [AuthGuard] },
  { path: 'configura', loadChildren: './componentes/configura/configura.module#ConfiguraPageModule' },
  { path: 'servicios', loadChildren: './componentes/servicios/servicios.module#ServiciosPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
