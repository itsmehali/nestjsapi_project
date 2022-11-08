import { type } from 'os';
import { CommentEntity } from 'src/comments/comment.entity';
import { PostEntity } from 'src/post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './enums/role.enum';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment, { onDelete: 'CASCADE' })
  comments: CommentEntity[];

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
