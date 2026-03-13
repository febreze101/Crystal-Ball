import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./pages/board-view/board-view').then((m) => m.BoardView);
    }
}];
