import { Brandings, City, County, Projects } from "@prisma/client";

// types/index.ts
export interface FileType {
  id: string;
  name: string;
  path: string;
  createdAt: Date;
}


export type CityWCounty = City & { counties: County[] }

export type ProjectWBranding = Projects & { Brandings: Brandings }