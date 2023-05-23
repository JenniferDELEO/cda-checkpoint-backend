import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

const dataSource = new DataSource({
  type: "sqlite",
  database: "countries.sqlite",
  synchronize: true,
  entities: [Country],
  logging: ["query", "error"],
});

export default dataSource;
