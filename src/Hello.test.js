import React from 'react'
import { render, screen} from '@testing-library/react'
import Hello from './Hello'

test('renders names passed in as properties', () => {
    render(<Hello name="spaced name" />);
    const header = screen.getByText(/spaced name/i);
    expect(header).toBeVisible();
});