import { initialState, reducer } from './people.reducer';
import {
  addPerson,
  deletePerson,
  getPeople,
  getPeopleSuccess,
} from './people.actions';
import { expect } from '@jest/globals';
import { Person } from '../person.interface';
import { PersonPaginatedList } from '../person-paginated-list.interface';

const fakeUUID = `${1}-${1}-${1}-${1}-${1}`;
global.crypto.randomUUID = jest.fn(() => fakeUUID);

describe('People Reducer', () => {
  const fakePerson = {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1',
  } as Person;
  const fakePersonPaginatedList = {
    results: [fakePerson],
  } as PersonPaginatedList;

  describe('getPeople', () => {
    it('should set isLoading to true and personPaginatedList to null', () => {
      const action = getPeople({ page: 1 });
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.personPaginatedList).toBeNull();
    });
  });

  describe('getPeopleSuccess', () => {
    it('should set isLoading to false and update personPaginatedList', () => {
      const action = getPeopleSuccess({
        personPaginatedList: fakePersonPaginatedList,
      });
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.personPaginatedList).toEqual({
        results: [{ ...fakePerson, id: '1' }],
      });
    });
  });

  describe('addPerson', () => {
    it('should add a new person to the list', () => {
      jest.mock('crypto', () => ({
        randomUUID: jest.fn(() => '123'),
      }));
    });
    const action = getPeopleSuccess({
      personPaginatedList: fakePersonPaginatedList,
    });
    const state = reducer(initialState, action);
    const newPerson = {
      name: 'Darth Vader',
      url: 'https://swapi.dev/api/people/4',
    } as Person;
    const addAction = addPerson({ person: newPerson });
    const newState = reducer(state, addAction);

    expect(newState.personPaginatedList!.results).toHaveLength(2);
    expect(newState.personPaginatedList!.results[1]).toEqual({
      ...newPerson,
      id: fakeUUID,
    });
  });

  describe('deletePerson', () => {
    it('should delete a person from the list', () => {
      const action = getPeopleSuccess({
        personPaginatedList: fakePersonPaginatedList,
      });
      const state = reducer(initialState, action);
      const deleteAction = deletePerson({ id: '1' });
      const newState = reducer(state, deleteAction);

      expect(newState.personPaginatedList!.results).toHaveLength(0);
    });
  });
});
