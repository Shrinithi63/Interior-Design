import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { DesignService } from 'src/app/services/design.service';
import { Design } from 'src/app/shared/models/design';

@Component({
  selector: 'app-design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.css'],
})
export class DesignPageComponent {
  design!: Design;
  constructor(
    activatedRoute: ActivatedRoute,
    designService: DesignService,
    private router: Router,
    private cartService: CartService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        designService.getDesignById(params.id).subscribe((serverDesign) => {
          this.design = serverDesign;
        });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.design);
    this.router.navigateByUrl('/cart-page');
  }
}
