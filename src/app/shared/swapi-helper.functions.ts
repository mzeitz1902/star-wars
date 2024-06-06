import {SwapiEntity} from './swapi-entity.interface';

/**
 * Extracts the ID from the URL of a {@link SwapiEntity}.
 */
export function getId(entity: SwapiEntity) {
  return entity.url.split('/')[5];
}
