import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Tutorial} from "../../models/tutorial";
import {TutorialService} from "../../_services/tutorial.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Organism} from "../../models/organism.model";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrl: './tutorial-details.component.css'
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;


  editable!: TemplateRef<any>;

  @Input() currentTutorial: Tutorial = {
    title: '',
    recipeToday: 0,
    balancePreviousMonth: 0,
    totalRecipeToday: 0,

    operationTreasuryAnterior: 0,
    operationTreasuryToday: 0,
    totalOperationTreasury: 0,

    operationPreviousRegulation: 0,
    operationRegulationToday: 0,
    totalOperationRegulation: 0,

    totalExpenses: 0,

    finalBalanceToday: 0,

    postCurrentAccount: 0,
    creditExpected: 0,
    rateExpected: 0,
    finalPostCurrentAccount: 0,

    otherValues: 0,
    statesRepartition: 0,

    totalCash: 0,

    moneySpecies: 0,

    moneyOnCashier: 0,
    providedMoneyOnCashier: 0,
    surplus: 0,
    deficit: 0,

    organism: new Organism,
    description: '',
    published: false
  };

  message = '';
  extractedDate: string = '';


  comparisonMessage: string = '';
  comparisonClass: string = '';
  differenceAmount: number = 0;


  totalRecipeToday: number =0;
  totalTreasuryOperations: number =0;
  totalRegulationOperations: number =0;
  totalExpenses: number =0;
  currentBalanceToday: number =0;
  FinalPostalCurrentAccount: number =0;
  TotalCash: number =0;
  CurrencyCashOnCashier: number =0;
  constructor(
      private tutorialService: TutorialService,
      private route: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    };
    this.loadTotalRecipe();
    this.loadTotalTreasuryOperations();
    this.loadTotalRegulationOperations();
    this.loadTotalExpenses();
    this.loadCurrentBalanceToday();
    this.loadFinalPostalCurrentAccount();
    this.loadTotalCash();
    this.loadCurrencyCashOnCashier();

  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        console.log('Code Organisme:', data.organism.code);
        this.currentTutorial = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentTutorial.published = status;
        this.message = res.message
            ? res.message
            : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    if (confirm('Are you sure to update this record?'))
    this.tutorialService
        .update(this.currentTutorial.id, this.currentTutorial)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.info('Updated successfully', 'Application Livre de Caisse')
            this.router.navigate(['/tutorials']).then(r => {
              console.log('Navigation successful:', r);
            });

          },
          error: (e) => console.error(e)
        });
  }

  deleteTutorial(): void {
    if (confirm('Are you sure to delete this record?'))
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.error('Deleted successfully', 'Application Livre de Caisse')
        this.router.navigate(['/tutorials']).then(r => {
          console.log('Navigation successful:', r);
        });
      },
      error: (e) => console.error(e)
    });
  }

  loadTotalRecipe(): void {
    this.tutorialService.getTotalRecipe()
      .pipe(
        tap(totalRecipe => this.totalRecipeToday = totalRecipe),
        catchError(error => {
          console.error('Error fetching total recipe:', error);
          return of(0); // Provide a fallback value
        })
      )
      .subscribe();
  }

  loadTotalTreasuryOperations(): void {
    this.tutorialService.getTotalTreasuryOperations()
        .subscribe((totalTreasuryOperations) => {
          this.totalTreasuryOperations = totalTreasuryOperations;
        }, (error) => {
          console.error('Error fetching total recipe:', error);
        });
  }

  loadTotalRegulationOperations(): void {
    this.tutorialService.getTotalRegulationOperations()
        .subscribe((totalRegulationOperations) => {
          this.totalRegulationOperations = totalRegulationOperations;
        }, (error) => {
          console.error('Error fetching total recipe:', error);
        });
  }

  loadTotalExpenses(): void {
    this.tutorialService.getTotalExpenses()
        .subscribe((totalExpenses) => {
          this.totalExpenses = totalExpenses;
        }, (error) => {
          console.error('Error fetching total recipe:', error);
        });
  }

  loadCurrentBalanceToday(): void {
    this.tutorialService.getCurrentBalanceToday()
        .subscribe((currentBalanceToday) => {
          this.currentBalanceToday = currentBalanceToday;
        }, (error) => {
          console.error('Error fetching total recipe:', error);
        });
  }

  private loadFinalPostalCurrentAccount(): void {
    this.tutorialService.getFinalPostalCurrentAccount()
        .subscribe((currentBalanceToday) => {
          this.FinalPostalCurrentAccount = currentBalanceToday;
        }, (error) => {
          console.error('Error fetching total recipe:', error);
        });

  }

  private loadTotalCash() : void {
    this.tutorialService.getTotalCash()
        .subscribe((currentBalanceToday) => {
          this.TotalCash = currentBalanceToday;
        }, (error) => {
          console.error('Error fetching total recipe:', error);
        });

  }

  private loadCurrencyCashOnCashier() : void {
    this.tutorialService.getCurrencyCashOnCashier()
        .subscribe((currentBalanceToday) => {
          this.CurrencyCashOnCashier = currentBalanceToday;
        }, (error) => {
          console.error('Error fetching total recipe:', error);
        });

  }
}
