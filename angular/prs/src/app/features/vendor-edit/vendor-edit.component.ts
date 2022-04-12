import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/Services/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendor: Vendor = new Vendor()
  vendorId: number = 0

  constructor(private vendorService: VendorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.vendorId = params.id
        this.vendorService.getById(this.vendorId).subscribe(
          data => {
            if (data.length > 0) {
              this.vendor = data[0]
            }
            console.log(data)

          },
          error => { console.log(error) }


        )
      }
    )
  }

  editVendor() {
    this.vendorService.updateVendor(this.vendor).subscribe(
      data => {
        this.router.navigateByUrl('vendor/detail/' + this.vendor.id)
      },
      error => console.log(error)


    )
  }
}
