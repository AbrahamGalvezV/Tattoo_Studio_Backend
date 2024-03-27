import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray, getUsersAccordingRole } from "../../helpers/common";
import { Appointment } from "../../models/Appointment";
import { Service } from "../../models/Service";
import { User } from "../../models/User";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Seeder } from "./Seeder";

//----------------------------------------------------------------

export class AppointmentsSeeder extends Seeder {
  protected async generate(): Promise<void> {

    const {APPOINTMENTS} = SeederConfig;

    
    const services = await Service.find();
    const users= await User.find();
    const clients = getUsersAccordingRole(users,3);
    const artists = getUsersAccordingRole(users,2);

    
    const appointments =  new AppointmentFactory().createMany(APPOINTMENTS);
    appointments.forEach(appointment =>{
      appointment.service=getRandomValueFromArray(services);
      appointment.client=getRandomValueFromArray(clients);
      appointment.artist=getRandomValueFromArray(artists);
    })
    await Appointment.save(appointments);



  }

}