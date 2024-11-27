import { Brandings, City, County } from "@prisma/client";

// types/index.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}


export type CityWCounty = City & { counties: County[] }

export type ProjectWBranding = Project & { Brandings: Brandings }