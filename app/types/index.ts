import { Brandings, City, County, Projects } from "@prisma/client";

// types/index.ts

export type CityWCounty = City & { counties: County[] }

export type ProjectWBranding = Projects & { Brandings: Brandings }