import { Component } from '@angular/core';
import { Organism } from '../models/organism.model';
import {OrganismService} from "../_services/organism.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-organism-create',
  templateUrl: './organism-create.component.html',
  styleUrl: './organism-create.component.css'
})
export class OrganismCreateComponent {

  organism: Organism = { type: '', name: '', code: '' };

  constructor(private organismService: OrganismService,
              private router: Router) { }

  createOrganism(): void {
    this.organismService.createOrganism(this.organism).subscribe({
      next: (response) => {
        console.log('Organism created successfully', response);
        this.router.navigate(['/home']).then(() => {
          console.log('Navigation successful');
        }).catch(err => {
          console.error('Navigation error', err);
        });
      },
      error: (error) => {
        console.error('There was an error creating the organism!', error);
        // Handle error, e.g., show an error message
      }
    });
  }


}
