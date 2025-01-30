import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {
        path: "projects",
        component: ProjectsComponent,
        data: {
            title: 'RandyBeal.Dev | Projects'
        }
    },
    {
        path: "about",
        component: AboutComponent,
        data: {
            title: 'RandyBeal.Dev | About'
        }
    },
    {
        path: "**",
        component: WelcomeComponent,
    }
];
