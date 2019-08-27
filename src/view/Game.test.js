import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react'

import Game from './Game';

describe('<Game/> tests', () => {

  test('Loads picking site', () => {
    const { getByText } = render(<Game />)
    expect(getByText('Pick cards!')).toBeDefined();
    expect(getByText('Characters')).toBeDefined();
  })

  test('Picking works', async () => {
    const { getByText, getByAltText } = render(<Game />)
    const card = getByText('Characters');
    fireEvent.click(card);
    const loadingImg = await getByAltText('Loading circle');
    expect(loadingImg).toBeDefined();
  })

  test('Loads game after pick', async () => {
    jest.setTimeout(15000);
    const { getByText, container } = render(<Game />)
    const card = getByText('Characters');
    fireEvent.click(card);
    const playButton = await waitForElement(() => (
      getByText('Next round!')
    ),
      {
        container,
        timeout: 15000,
      }
    )
    expect(playButton).toBeDefined();
    const score = getByText('Change cards');
    expect(score).toBeDefined();
  })
})
