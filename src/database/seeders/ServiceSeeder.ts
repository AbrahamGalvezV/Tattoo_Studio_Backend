import { ServiceFactory } from "../factories/ServiceFactory";
import { Seeder } from "./Seeder";
import { Service } from "../../models/Service";
import { SeederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";

//----------------------------------------------------------------

export class ServiceSeeder extends Seeder {
  protected async generate(): Promise<void> {
    const { SERVICES } = SeederConfig;




    const services = new ServiceFactory().createMany(SERVICES);
    
    await Service.save(services);

  }
  
}