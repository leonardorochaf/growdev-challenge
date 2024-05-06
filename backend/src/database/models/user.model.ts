/* eslint-disable @typescript-eslint/indent */
import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './role.model';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Role, { cascade: false })
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
