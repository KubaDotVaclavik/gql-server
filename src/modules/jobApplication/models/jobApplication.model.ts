import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JobApplication {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  candidateId: string;

  @Field((type) => ID)
  jobAdId: string;
}
