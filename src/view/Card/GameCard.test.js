import React from 'react';
import { render } from '@testing-library/react'
import GameCard from './GameCard';

describe('<GameCard /> tests', () => {
  test('<GameCard/> render', () => {
    const { getByText } = render(<GameCard stats={{ name: 'test', winFactorName: 'mass', value: '555' }} />)
    const name = getByText('test');
    expect(name).toBeDefined();
    const factor = getByText('mass : 555');
    expect(factor).toBeDefined();
  })
})