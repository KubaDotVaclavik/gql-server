import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";

@InputType()
export class CandidatesWhere {
  @Field({ nullable: true })
  skillsContaines?: string;

  @Field({ nullable: true })
  fullNameContaines?: string;

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(1000000)
  salaryMax?: number;

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(1000000)
  salaryMin?: number;
}
