import { AppointmentsSeeder } from "./AppointmentsSeeder";
import { RoleSeeder } from "./RoleSeeder";
import { ServiceSeeder } from "./ServiceSeeder";
import { UserSeeder } from "./UserSeeder";

//----------------------------------------------------------------

(async () => {  
    console.log('Starting seeders...');

    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new ServiceSeeder().start();
    await new AppointmentsSeeder().start();

})();

