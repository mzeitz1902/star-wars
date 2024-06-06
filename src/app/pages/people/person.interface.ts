import { SwapiEntity } from '../../shared/swapi-entity.interface';

export type Gender = 'male' | 'female' | 'n/a';

export interface Person extends SwapiEntity {
  name: string | null;
  height: string | null;
  mass: string | null;
  hair_color: string | null;
  skin_color: string | null;
  eye_color: string | null;
  birth_year: string | null;
  gender: Gender;
  homeworld: string | null;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string | null;
  edited: string | null;
  id?: string | null; // not in the API response, will be created via URL
}
