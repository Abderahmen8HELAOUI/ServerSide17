import {Component, Input, OnInit} from '@angular/core';
import {Organism} from "../../models/organism.model";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganismService} from "../../_services/organism.service";

@Component({
  selector: 'app-organism-details',
  templateUrl: './organism-details.component.html',
  styleUrl: './organism-details.component.css'
})
export class OrganismDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentOrganism: Organism = {
    type: '',
    name: '',
    code: ''
  };

  message = '';

  constructor(
      private organismService: OrganismService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      //this.getOrganism(this.route.snapshot.params['id']);
    }
  }

  fetchOrganismId(code: string) {
    this.organismService.getOrganismIdByCode(code).subscribe({
      next: (id) => {
        console.log('Organism ID:', id);
        // Handle the ID
      },
      error: (err) => console.error('Error:', err)
    });
  }

  // updatePublished(status: boolean): void {
  //   const data = {
  //     type: this.currentOrganism.type,
  //     name: this.currentOrganism.name,
  //     code: this.currentOrganism.code
  //   };
  //
  //   this.message = '';
  //
  //   this.organismService.update(this.currentOrganism.id, data).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.currentOrganism.published = status;
  //       this.message = res.message
  //           ? res.message
  //           : 'The status was updated successfully!';
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }
  //
  // updateOrganism(): void {
  //   this.message = '';
  //
  //   this.organismService
  //       .update(this.currentOrganism.id, this.currentOrganism)
  //       .subscribe({
  //         next: (res) => {
  //           console.log(res);
  //           this.message = res.message
  //               ? res.message
  //               : 'This Organism was updated successfully!';
  //         },
  //         error: (e) => console.error(e)
  //       });
  // }
  //
  // deleteOrganism(): void {
  //   this.organismService.delete(this.currentOrganism.id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.router.navigate(['/Organisms']);
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }
}
