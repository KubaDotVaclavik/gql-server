import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Length } from "class-validator";

@InputType()
export class CandidateCreateInput {
  @Field()
  @Length(2, 40)
  fullName: string;

  @Field({ nullable: true })
  @IsOptional()
  salary?: number;

  @Field()
  @Length(0, 80)
  skills: string;
}
