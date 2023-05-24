export interface Chicken {
  id: string;
  name: string;
  description: string;
  type: number;
  vaccinations: Vaccination[];
}

export interface Vaccination {
  name: string;
  dateGiven: Date;
}
