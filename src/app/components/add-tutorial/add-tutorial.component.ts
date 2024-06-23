import {Component, OnInit} from '@angular/core';
import {Tutorial} from "../../models/tutorial";
import {Router} from "@angular/router";
import {TutorialService} from "../../_services/tutorial.service";
import {OrganismService} from "../../_services/organism.service";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrl: './add-tutorial.component.css'
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    title: '',
    recipeToday: 0,
    balancePreviousMonth: 0,
    operationTreasuryAnterior: 0,
    operationTreasuryToday: 0,
    operationPreviousRegulation: 0,
    operationRegulationToday: 0,
    postCurrentAccount: 0,
    creditExpected: 0,
    rateExpected: 0,
    otherValues: 0,
    statesRepartition: 0,
    moneySpecies: 0,
    description: '',
    published: false
  };
  submitted = false;
  organismCode!: string;

  constructor(
    private tutorialService: TutorialService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
      this.organismCode = this.storageService.getOrganismCode() || '';
      if (!this.organismCode) {
          console.error('Organism code not found');
          return;
      }


      // Fetching necessary data to initialize the tutorial
    this.tutorialService.getFinalBalanceLastMonth().subscribe(
      res => {
        this.tutorial.balancePreviousMonth = res;
        console.log(res);
      }
    );

    this.tutorialService.getTotalTreasuryOperationsLastRow().subscribe(
      res => {
        this.tutorial.operationTreasuryAnterior = res;
        console.log(res);
      }
    );

    this.tutorialService.getTotalRegulationOperationsLastRow().subscribe(
      res => {
        this.tutorial.operationPreviousRegulation = res;
        console.log(res);
      }
    );

    this.tutorialService.getPostalCurrentAccountLastRow().subscribe(
        res => {
          this.tutorial.postCurrentAccount = res;
          console.log(res);
        }
    );

    this.tutorialService.getStatesRepartitionLastRowLastRow().subscribe(
        res => {
          this.tutorial.statesRepartition = res;
          console.log(res);
        }
    );
  }

  saveTutorial(): void {
      if (!this.organismCode) {
          console.error('Cannot save tutorial without organism code');
          return;
      }
    const data = {
      title: this.tutorial.title,
      recipeToday: this.tutorial.recipeToday,
      balancePreviousMonth: this.tutorial.balancePreviousMonth,
      operationTreasuryAnterior: this.tutorial.operationTreasuryAnterior,
      operationTreasuryToday: this.tutorial.operationTreasuryToday,
      operationPreviousRegulation: this.tutorial.operationPreviousRegulation,
      operationRegulationToday: this.tutorial.operationRegulationToday,
      postCurrentAccount: this.tutorial.postCurrentAccount,
      creditExpected: this.tutorial.creditExpected,
      rateExpected: this.tutorial.rateExpected,
      otherValues: this.tutorial.otherValues,
      statesRepartition: this.tutorial.statesRepartition,
      moneySpecies: this.tutorial.moneySpecies,
      description: this.tutorial.description
    };

    this.tutorialService.createTutorialByOrganismCode(this.organismCode, data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      recipeToday: 0,
      balancePreviousMonth: 0,
      operationTreasuryAnterior: 0,
      operationTreasuryToday: 0,
      operationPreviousRegulation: 0,
      operationRegulationToday: 0,
      postCurrentAccount: 0,
      creditExpected: 0,
      rateExpected: 0,
      otherValues: 0,
      statesRepartition: 0,
      moneySpecies: 0,
      description: '',
      published: false
    };
  }
}
