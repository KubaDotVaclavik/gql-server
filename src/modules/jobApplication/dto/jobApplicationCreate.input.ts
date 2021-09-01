import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class JobApplicationCreateInput {
  @Field((type) => ID)
  candidateId: string;
  @Field((type) => ID)
  jobAdId: string;
}
