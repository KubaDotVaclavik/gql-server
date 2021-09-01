import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JobAd {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  salary?: number;

  @Field()
  text: string;
}
