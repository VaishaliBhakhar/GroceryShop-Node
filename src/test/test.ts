import * as GroceryService from '../grocery.service';
import { expect } from 'chai';

describe('Basket with 7 items', () => {
  it('should return amount', () => {
    const result = GroceryService.applyScheme(["apple", "banana", "banana", "potato", "tomato", "banana", "potato"])
    expect(result).to.equal('1 aws 99 clouds');
  });
});

describe('Basket with 6 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["potato", "apple", "banana", "banana", "tomato", "apple"])
        expect(result).to.equal('2 aws 10 clouds');
    });
});

describe('Basket with 8 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["banana", "apple", "tomato", "potato", "apple", "tomato",  "tomato", "potato"])
        expect(result).to.equal('2 aws 39 clouds');
    });
});

describe('Basket with 7 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["banana", "banana", "banana", "banana", "banana", "banana", "banana"])
        expect(result).to.equal('2 aws 20 clouds');
    });
});

describe('Basket with 8 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["potato", "tomato", "potato", "tomato", "potato", "tomato", "potato", "tomato"])
        expect(result).to.equal('1 aws 83 clouds');
    });
});

describe('Basket with 7 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["potato", "potato", "apple", "tomato", "banana", "apple", "banana"])
        expect(result).to.equal('2 aws 16 clouds');
    });
});

describe('Basket with 4 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["potato", "potato", "apple", "tomato"])
        expect(result).to.equal('1 aws 6 clouds');
    });
});

describe('Basket with 3 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["potato", "potato", "apple"])
        expect(result).to.equal('0 aws 76 clouds');
    });
});

describe('Basket with 2 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["potato", "potato"])
        expect(result).to.equal('0 aws 39 clouds');
    });
});

describe('Basket with 1 items', () => {
    it('should return amount', () => {
        const result = GroceryService.applyScheme(["potato"])
        expect(result).to.equal('0 aws 26 clouds');
    });
});