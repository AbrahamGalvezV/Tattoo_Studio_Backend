import {
    BaseEntity,
     Column,
      Entity,
       JoinColumn,
        ManyToOne,
         PrimaryGeneratedColumn,
    } from "typeorm";
    import { Service } from "./Service";
    import { User } from "./User";

//----------------------------------------------------------------

@Entity("appointments")
  export class Appointment extends BaseEntity {
        
    @PrimaryGeneratedColumn()
      id?: number;
  
    @Column({ name: "appointment_date" })
      appointmentDate!: Date;
    
      @Column({ name: "client_id" })
      clientId!: number;
    
      @Column({ name: "service_id" })
      serviceId!: number;

      @Column({ name: "artist_id" })
      artistId!: number;

// Relation: Appointments {0,1,2,...}--{1} Service_id
  
    @ManyToOne(() => Service, (service) => service.id)
    @JoinColumn({ name: "service_id" })
      service!: Service;

// Relation: Appointments {0,1,2,...}--{1} User_id
  
    @ManyToOne(() => User, (client) => client.id)
    @JoinColumn({ name: "client_id" })
      client!: User;

    @ManyToOne(() => User, (artist) => artist.id)
    @JoinColumn({ name: "artist_id" })
      artist!: User;


      
}