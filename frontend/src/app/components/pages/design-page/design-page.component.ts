import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DesignService } from 'src/app/services/design.service';
import { Design } from 'src/app/shared/models/design';
// import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.css'],
})
export class DesignPageComponent {
  design!: Design;
  // constructor(
  //   activatedRoute: ActivatedRoute,
  //   designService: DesignService,
  //   private cartService: CartService,
  //   private router: Router
  // ) {
  //   activatedRoute.params.subscribe((params) => {
  //     if (params.id) this.design = designService.getDesignById(params.id);
  //   });
  // }
  // addToCart() {
  //   this.cartService.addToCart(this.design);
  //   this.router.navigateByUrl('/cart-page');
  // }
  constructor(activatedRoute: ActivatedRoute, designService: DesignService) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) this.design = designService.getDesignById(params.id);
    });
  }
  ngOnInit(): void {}
}
