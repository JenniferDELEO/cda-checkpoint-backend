import { ObjectType, Field } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Country {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  code: String;

  @Field()
  @Column()
  name: String;

  @Field()
  @Column()
  emoji: String;

  @Field()
  @Column()
  continent: String;
}
