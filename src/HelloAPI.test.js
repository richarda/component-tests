import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import HelloAPI from './HelloAPI';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders greeting from an api call', async () => {
  render(<HelloAPI url="/greeting" />);
  const greetingElement = await waitFor(() =>
    screen.findByText(/hello there/i)
  );
  expect(greetingElement).toBeVisible();
});

test('renders another greeting from an api call', async () => {
  // override default response specified above
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.json({ greeting: 'hello again' }));
    })
  );

  render(<HelloAPI url="/greeting" />);
  // change this text from "hello again" to something else to see a failure
  expect(await screen.findByText(/hello again/i)).toBeVisible();
});

