import { Component } from '@angular/core';
import {Organism} from "../../models/organism.model";
import {OrganismService} from "../../_services/organism.service";

@Component({
  selector: 'app-organism-list',
  templateUrl: './organism-list.component.html',
  styleUrl: './organism-list.component.css'
})
export class OrganismListComponent {
  organisms: Organism[] = [];
  isLoading = true;

  constructor(private organismService: OrganismService) {}

  ngOnInit(): void {
    this.organismService.getOrganisms().subscribe({
      next: (data) => {
        this.organisms = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching organisms', err);
        this.isLoading = false;
      }
    });
  }
}
