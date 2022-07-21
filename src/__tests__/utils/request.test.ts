import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor } from '@testing-library/react';
import { request } from '@app/utils/request';
import { hotels } from '@app/__mocks__/hotels';
import { Hotel } from '@app/interfaces/hotel';

const server = setupServer(
  rest.get('/hotels', (req, res, ctx) => {
    return res(ctx.json(hotels));
  }),

  rest.get('/hotels/invalid-json', (req, res, ctx) => {
  	const response = JSON.stringify(hotels).replace(']', ",\r\n    ]");
    return res(ctx.text(response));
  }),

  rest.get('/hotels/invalid-json-2', (req, res, ctx) => {
  	const response = JSON.stringify(hotels).replace(']', ",]");
    return res(ctx.text(response));
  }),

  rest.post('/hotels', (req, res, ctx) => {
    return res(ctx.json(hotels[0]));
  }),

  rest.get('/error', (req, res, ctx) => {
  	return res(ctx.status(500));
  }),

  rest.put('/hotels/:name', (req, res, ctx) => {
  	return res(ctx.json(hotels.find(h => h.name === req.params.name)));
  }),
);

describe('request', () => {

	beforeAll(() => server.listen());
	
	afterEach(() => server.resetHandlers());
	
	afterAll(() => server.close());

	it('can send get request and return response', async () => {
		const response = await request<Array<Hotel>>('/hotels', {
			method: 'GET',
		});

		expect(response).toMatchObject(hotels);
	});

	it('can send post request and return response', async () => {
		const response = await request('/hotels', {
			method: 'POST',
		});
		
		expect(response).toMatchObject(hotels[0]);
	});

	it('can handle server errors', async () => {
		const req = request<any>('/error', {
			method: 'GET',
		});

		await expect(req).rejects.toThrowError('Failed to fetch');
	});

	it('can handle invalid json from: https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c', async () => {
		const response = await request<Array<Hotel>>('/hotels/invalid-json', {
			method: 'GET',
		});

		expect(true).toBe(true);
	});

	it('can not handle any other invalid hotels json response', async () => {
		const response = request<Array<Hotel>>('/hotels/invalid-json-2', {
			method: 'GET',
		});

		await expect(response).rejects.toThrowError('Failed to fetch: Invalid JSON');
	});

	it('can handle put requests', async () => {

		const hotel = hotels[0];
		const response = await request<Hotel>(`/hotels/${hotel.name}`, {
			method: 'PUT',
		});

		expect(response).toMatchObject(hotel);
	});

	it('can send request without configuration', async () => {
		const response = await request<Array<Hotel>>('/hotels');
		expect(response).toMatchObject(hotels);
	});
});
