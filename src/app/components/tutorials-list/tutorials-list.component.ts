import {Component, OnInit} from '@angular/core';
import {Tutorial} from "../../models/tutorial";
import {TutorialService} from "../../_services/tutorial.service";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrl: './tutorials-list.component.css'
})
export class TutorialsListComponent  implements OnInit {

  tutorials: Tutorial[] = [];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  organismCode: string;

  constructor(private tutorialService: TutorialService,
              private storageService: StorageService) {
    this.organismCode = this.storageService.getOrganismCode() || '';
  }

  ngOnInit(): void {
    if (!this.organismCode) {
      console.error('Organism code not found');
      return;
    }

    this.retrieveTutorials();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.tutorialService.getAllByOrganismCode(this.organismCode, params)
        .subscribe({
          next: (data) => {
            const { tutorials, totalItems } = data;
            this.tutorials = tutorials;
            this.count = totalItems;
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          }
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
        .subscribe({
          next: res => {
            console.log(res);
            this.refreshList();
          },
          error: err => {
            console.log(err);
          }
        });
  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveTutorials();
  }
}
