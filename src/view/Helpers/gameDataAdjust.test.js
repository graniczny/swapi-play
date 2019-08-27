import {
  determineWiningCard,
  getWinner,
  getRandomCards,
  getOnlyWantedFields,
  prepareRoundData
} from './gameDataAdjust';
import { apiFetch } from './apiFetch';

let dataFeed = [];
const winFactor = 'mass';
beforeEach(async () => {
  jest.setTimeout(30000);
  dataFeed = await apiFetch('https://swapi.co/api/people');
});
// units
describe("Data Adjust handlers", () => {
  test('Selects good game outcome', () => {
    const out1 = determineWiningCard([{ value: '5' }, { value: '6' }]);
    expect(out1).toStrictEqual([{ value: '5' }, { value: '6', win: true }])
    const out2 = determineWiningCard([{ value: '5' }, { value: '5' }]);
    expect(out2).toStrictEqual([{ value: '5', win: 'draw' }, { value: '5', win: 'draw' }])
    const out3 = determineWiningCard([{ value: 'unknown' }, { value: '15' }]);
    expect(out3).toStrictEqual([{ value: 'unknown', win: 'draw' }, { value: '15', win: 'draw' }])
  })

  test('Selects good winner', () => {
    const out1 = getWinner({ player1: { win: true }, player2: {} });
    expect(out1).toBe('player1');
    const out2 = getWinner({ player1: {}, player2: { win: true } });
    expect(out2).toBe('player2');
    const out3 = getWinner({ player1: { win: 'draw' }, player2: { win: 'draw' } });
    expect(out3).toBe('draw');
  })

  test('Picks good data', () => {
    const out1 = getRandomCards(dataFeed);
    expect(out1).toHaveLength(2);
    const out2 = getRandomCards([1, 2]);
    expect(out2).toContain(2, 1)
  })

  test('Withdraws good data', () => {
    const out1 = getOnlyWantedFields(dataFeed);
    expect(typeof out1).toBe('object');
    expect(out1.length).toBe(dataFeed.length);
    const out2 = getOnlyWantedFields([]);
    expect(out2).toStrictEqual([]);
  })
})

//integrations
describe('Final data pick', () => {
  test('Get final cards', () => {
    const out1 = prepareRoundData(dataFeed, winFactor);
    expect(typeof out1).toBe('object');
    expect(Object.keys(out1).length).toBe(2);
    expect(Object.keys(out1)).toStrictEqual(['player1', 'player2']);
    expect(!!out1.player1.value).toBe(true);
    expect(!!out1.player2.value).toBe(true);
    expect(!!out1.player2.name).toBe(true);
    expect(!!out1.player2.name).toBe(true);
    expect(out1.player1.name !== out1.player2.name).toBe(true);

  })
})
