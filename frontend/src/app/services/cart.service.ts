import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { Design } from '../shared/models/design';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(
    this.constructor()
  );
  addToCart(design: Design): void {
    let cartItem = this.cart.items.find((item) => item.design.id === design.id);
    if (cartItem) return;
    this.cart.items.push(new CartItem(design));
    this.setCartToLocalStorage();
  }
  removeFromCart(designId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.design.id != designId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(designId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.design.id === designId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.design.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
