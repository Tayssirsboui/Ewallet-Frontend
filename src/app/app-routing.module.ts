import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { TypesCategoriesComponent } from './pages/categories/types-categories/types-categories.component';
import { FullCalendarComponent } from './pages/full-calendar/full-calendar.component';
import { CategorieFormComponent } from './pages/categories/categorie-form/categorie-form.component';
import { TableUtilisateursComponent } from './pages/utilisateurs/table-utilisateurs/table-utilisateurs.component';
import { CalendrierComponent } from './pages/depenses/calendrier/calendrier.component';
import { ChartsComponent } from './pages/depenses/charts/charts.component';
import { PaiementprevusComponent } from './pages/depenses/paiementprevus/paiementprevus.component';
import { CalendrierrevenuComponent } from './pages/revenus/calendrierrevenu/calendrierrevenu.component';
import { ChartsrevenuComponent } from './pages/revenus/chartsrevenu/chartsrevenu.component';
import { SyncfusionSchedulerComponent } from './pages/syncfusion-scheduler/syncfusion-scheduler.component';







const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'charts-apexcharts', component: ChartsApexchartsComponent },
  { path: 'charts-chartjs', component: ChartsChartjsComponent },
  { path: 'form-editors', component: FormsEditorsComponent },
  { path: 'form-elements', component: FormsElementsComponent },
  { path: 'form-layouts', component: FormsLayoutsComponent },
  { path: 'icons-bootstrap', component: IconsBootstrapComponent },
  { path: 'icons-boxicons', component: IconsBoxiconsComponent },
  { path: 'icons-remix', component: IconsRemixComponent },
  { path: 'list-group', component: ListGroupComponent },
 
  { path: 'pagination', component: PaginationComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'spinners', component: SpinnersComponent },
  { path: 'tables-data', component: TablesDataComponent },
  { path: 'tables-general', component: TablesGeneralComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  {path:'requests' ,component: RequestsComponent},
  {path:'types-categories' ,component: TypesCategoriesComponent},
  {path:'categorie-form' ,component: CategorieFormComponent},
  {path:'full-calendar' ,component: FullCalendarComponent},
  {path:'table-utilisateurs' ,component: TableUtilisateursComponent},
  { path: 'path-string', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'path-string', loadChildren: () => import('./pages/utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule) },
 
  { path: 'calendrier', component: CalendrierComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'calendrierrevenu', component: CalendrierrevenuComponent },
  { path: 'chartsrevenu', component: ChartsrevenuComponent },
  { path: 'paiementprevus', component:PaiementprevusComponent},
 
  { path: 'path-string', loadChildren: () => import('./pages/depenses/depenses.module').then(m => m.DepensesModule) },
  { path: 'path-string', loadChildren: () => import('./pages/revenus/revenus.module').then(m => m.RevenusModule) },
  
  {path:'syncfusion-scheduler' ,component: SyncfusionSchedulerComponent},
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
