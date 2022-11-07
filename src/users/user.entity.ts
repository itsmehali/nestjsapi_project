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

  @Column({ default: 'user' })
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
