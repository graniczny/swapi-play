import { apiFetch, singleFetch } from './apiFetch';

const url = 'https://swapi.co/api/people';
const singleUrl = 'https://swapi.co/api/people/?page=1'

//unit
describe('Single data fetching', () => {
  test("Get data", async () => {
    jest.setTimeout(10000);
    const singlePage = await singleFetch(singleUrl);
    expect(typeof singlePage).toBe('object');
    expect(singlePage.length > 0).toBe(true);
  })
})

//integration
describe('Multiple data fetching', () => {
  test('Fetch data from all pages', async () => {
    jest.setTimeout(30000);
    const allPages = await apiFetch(url);
    expect(typeof allPages).toBe('object');
    expect(allPages.length > 0).toBe(true);
  })
})