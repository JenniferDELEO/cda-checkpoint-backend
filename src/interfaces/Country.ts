import { InputType, Field } from "type-graphql";

@InputType({ description: "Update country data" })
export class UpdateCountryInput {
  @Field()
  code: String;

  @Field({ nullable: true })
  name: String;

  @Field({ nullable: true })
  emoji: String;

  @Field({ nullable: true })
  continent: String;
}
