import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, MaxLength, MinLength } from "class-validator";

@InputType()
export class JobAdUpdateInput {
  @Field({ nullable: true })
  @MaxLength(30)
  @MinLength(5)
  title?: string;

  @Field({ nullable: true })
  @MaxLength(300)
  @MinLength(10)
  text?: string;

  @Field({ nullable: true })
  @IsOptional()
  salary?: number;
}
