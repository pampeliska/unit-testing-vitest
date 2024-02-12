import { describe, expect, it, vi } from 'vitest';

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
