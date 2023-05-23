import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import dataSource from "../utils";
import { ApolloError } from "apollo-server";
import { Equal } from "typeorm";

@Resolver(Country)
export class CountryResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: String,
    @Arg("name") name: String,
    @Arg("emoji") emoji: String,
    @Arg("continent") continent: String
  ): Promise<Country | ApolloError> {
    try {
      const newCountry = new Country();
      newCountry.code = code;
      newCountry.name = name;
      newCountry.emoji = emoji;
      newCountry.continent = continent;
      const savedCountry = await dataSource.manager.save(Country, newCountry);
      console.log(savedCountry);
      return savedCountry;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  @Query(() => [Country])
  async getAllCountries(): Promise<Country[] | ApolloError> {
    try {
      return await dataSource.manager.find(Country);
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  @Query(() => Country)
  async getCountryByCode(
    @Arg("code") code: String
  ): Promise<Country | ApolloError> {
    try {
      const countryFromDb = await dataSource.manager.findOneByOrFail(Country, {
        code: Equal(code),
      });
      return countryFromDb;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  @Mutation(() => String)
  async deleteCountry(
    @Arg("code") code: String
  ): Promise<String | ApolloError> {
    try {
      await dataSource.manager.delete(Country, { code: Equal(code) });
      return "Country deleted";
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continent") continent: String
  ): Promise<Country[] | ApolloError> {
    try {
      const countryFromDb = await dataSource.manager.findBy(Country, {
        continent: Equal(continent),
      });
      return countryFromDb;
    } catch (error: any) {
      throw new ApolloError(error.message);
    }
  }
}
