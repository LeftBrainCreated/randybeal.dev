import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutComponent } from './components/about/about.component';
import { YouthSignUpComponent } from './components/youth-sign-up/youth-sign-up.component';

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
        path: "youth",
        component: YouthSignUpComponent,
        data: {
            title: 'Youth Sign Up'
        }
    },
    {
        path: "youth/:code",
        component: YouthSignUpComponent,
        data: {
            title: 'Youth Sign Up'
        }
    },
    {
        path: "**",
        component: WelcomeComponent,
    }
];
