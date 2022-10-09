import { PostEntity } from 'src/post/post.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column({ default: false })
  admin: boolean;

  //@OneToMany(() => PostEntity, (post) => post.user)
  // posts: PostEntity[];
}
