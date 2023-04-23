import { Design } from './design';

export class CartItem {
  constructor(public design: Design) {}
  quantity: number = 1;
  price: number = this.design.price;
}
