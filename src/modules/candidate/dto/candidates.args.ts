import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";
import { CandidatesWhere } from "./candidates.where";

@ArgsType()
export class CandidatesArgs {
  @Field((type) => Int)
  @Min(0)
  skip = 0;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take = 5;

  @Field((type) => CandidatesWhere, { nullable: true })
  where?: CandidatesWhere;
}
