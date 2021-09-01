import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Length } from "class-validator";

@InputType()
export class CandidateUpdateInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 40)
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  salary?: number;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 80)
  skills?: string;
}
