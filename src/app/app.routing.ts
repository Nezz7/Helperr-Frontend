import { Routes, RouterModule } from "@angular/router";
import { TemplateComponent } from "./template/template.component";
import { ProfileComponent } from "./profile/profile.component";
import { AllMessagesComponent } from "./all-messages/all-messages.component";
import { HelpmeComponent } from "./helpme/helpme.component";
import { HelpyouComponent } from "./helpyou/helpyou.component";
import { ProfileSettingComponent } from "./profile-setting/profile-setting.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SinginComponent } from "./singin/singin.component";
import { SingupComponent } from "./singup/singup.component";
import { HomepageComponent } from "./homepage/homepage.component";



const APP_ROUTES: Routes = [
    { path:'', redirectTo: '/homepage',pathMatch:'full'},
    { path:'homepage', component : HomepageComponent},
    { path:'profile',component:ProfileComponent},
    { path:'messages',component:AllMessagesComponent},
    { path:'helpme',component:HelpmeComponent},
    { path:'helpyou',component:HelpyouComponent},
    { path:'profile/setting',component:ProfileSettingComponent},
    { path:'notifications',component:NotificationsComponent},
    { path:'signin',component:SinginComponent},
    { path:'signup',component:SingupComponent}
];
export const routing = RouterModule.forRoot(APP_ROUTES);