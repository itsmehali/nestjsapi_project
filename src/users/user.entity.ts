import { PostEntity } from 'src/post/post.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // @Column({ default: false })
  // admin: boolean;

  //@OneToMany(() => PostEntity, (post) => post.user)
  // posts: PostEntity[];
}
