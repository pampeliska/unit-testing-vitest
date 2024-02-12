import { describe, expect, it, vi } from 'vitest';
import { trackPageView } from '../src/libs/analytics';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
} from '../src/mocking';

//mocking a module
vi.mock('../src/libs/currency'); //it's hoisted and executed as the first at the top
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');

describe('test suite', () => {
  it('test case', () => {
    const greet = vi.fn();
    greet.mockReturnValue('Hello'); //mocking the function returning value
    const result = greet();
    console.log(result);

    greet.mockResolvedValue('Hello'); //mocking the function returning promise
    greet().then((result) => {
      console.log(result);

      greet.mockImplementation((name) => 'Hello ' + name); //to add logic or implementation to mock function
      //   const result = greet('Jane');
      console.log(greet('Jane'));

      //matchers
      //   expect(greet).toHaveBeenCalled(); //to check if the function has been called
      //   expect(greet).toHaveBeenCalledWith('Jane'); //to check if the function has been called with this argument
      //   expect(greet).toHaveBeenCalledOnce();
    });
  });
});

describe('test suite 2', () => {
  it('test case', () => {
    // Create a mock for the function sendText(message) {}
    const sendText = vi.fn();
    sendText.mockReturnValue('ok');

    // Call the mock function
    const result = sendText('message');

    // Assert that the function was called
    expect(sendText).toHaveBeenCalledWith('message');

    // Assert that the result is 'ok'
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    //mocking module z libs mockujeme nahore
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'CZK');

    expect(price).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it('should return shipping unavailable if quote cannost be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);
    const result = getShippingInfo('Africa');
    expect(result).toMatch(/unavailable/i);
  });

  it('should return shipping info if quote can be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 12, estimatedDays: 3 });
    const result = getShippingInfo('Africa');
    expect(result).toMatch('$12');
    expect(result).toMatch(/3 days/i);
    expect(result).toMatch(/shipping cost: \$12 \(3 days\)/i);
  });
});

describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();
    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

