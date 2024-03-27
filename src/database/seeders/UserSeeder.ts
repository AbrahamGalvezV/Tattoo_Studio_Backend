import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";

//----------------------------------------------------------------

export class UserSeeder extends Seeder{
    protected async generate(): Promise<void> {
        
        const { ADMINS, ARTISTS, CLIENTS } = SeederConfig;

        const userFactory = new UserFactory();

    //ADMINS
        const adminUsers = userFactory.createMany(ADMINS);
        adminUsers.forEach((user, i) => {
            user.role = UserRoles.ADMIN;
            user.email = `admin${i + 1}@admin.com`;

        });

    // ARTISTS
        const artistUsers = userFactory.createMany(ARTISTS);
        artistUsers.forEach((user, i) => {
           user.role = UserRoles.ARTIST;
           user.email = `artist${i + 1}@artist.com`;
        });

    // CLIENTS
        const clientUsers = userFactory.createMany(CLIENTS);
        clientUsers.forEach((user) => {
           user.role = UserRoles.CLIENT;

        });

    // Save to database
        const allUsers = [...adminUsers, ...artistUsers, ...clientUsers];
        await User.save(allUsers);

    }
    
}