import { User } from "./user.model";

export class  Post {
    id : number;
    maker_id : number;
    helper_id  : number;
    help_session_id : number;
    cost : number;
    status : string;
    skills : string[];
    queue : string[];
    short_description : string;
    description : string;
    title : string;
    file : File;
    created_at : string;
    maker : User;
   }
   