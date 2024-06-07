import { SwapiEntity } from '../../shared/swapi-entity.interface';

export type Gender = 'male' | 'female' | 'n/a';

export interface Person extends SwapiEntity {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  id?: string; // not in the API response, will be created via URL
}
