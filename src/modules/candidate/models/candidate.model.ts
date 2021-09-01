import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Candidate {
  @Field(type => ID)
  id: string;

  @Field()
  fullName: string;

  @Field({nullable: true})
  salary?: number;

  @Field()
  skills: string;
}