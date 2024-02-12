import { describe, it, vi } from 'vitest';

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
