import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'niceimage' })
  image: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
