import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'new-note',
    loadChildren: () => import('./pages/new-note/new-note.module').then( m => m.NewNotePageModule)
  },
  {
    path: 'new-location',
    loadChildren: () => import('./pages/new-location/new-location.module').then( m => m.NewLocationPageModule)
  },
  {
    path: 'note-details',
    loadChildren: () => import('./pages/note-details/note-details.module').then( m => m.NoteDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
