import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, MaxLength, MinLength } from "class-validator";

@InputType()
export class JobAdCreateInput {
  @Field()
  @MaxLength(30)
  @MinLength(5)
  title: string;

  @Field()
  @MaxLength(300)
  @MinLength(10)
  text: string;

  @Field({ nullable: true })
  @IsOptional()
  salary?: number;
}
