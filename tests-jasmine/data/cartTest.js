import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    localStorage.clear();  // Clear localStorage before each test
    spyOn(localStorage, 'setItem').and.callThrough();  // Mock setItem
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);  // Mock getItem to return an empty cart
    });
    loadFromStorage();  // Load cart from mocked localStorage
  });

  it('adds a new product to the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{ productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1 }]);
    });
    loadFromStorage();  // Reload cart with mocked data
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
