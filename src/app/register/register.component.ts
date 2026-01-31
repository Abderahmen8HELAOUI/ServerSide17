import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {OrganismService} from "../_services/organism.service";
import {Organism} from "../models/organism.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  organisms: Organism[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private organismService: OrganismService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      uniqueIdentifier: ['', [Validators.required, Validators.maxLength(10)]],
      organismId: ['', [Validators.required]], // Changed to organismId
      role: [[]] // assuming roles is an array
    });

    this.organismService.getOrganisms().subscribe({
      next: data => {
        this.organisms = data;
      },
      error: err => {
        console.error('Error fetching organisms', err);
      }
    });
  }

  onSubmit(): void {
    const { username, email, password, uniqueIdentifier, organismId, role } = this.registerForm.value;

    this.authService.registerUser(organismId, {
      username,
      email,
      password,
      uniqueIdentifier,
      organismCode: '', // Removed organismCode from the form
      role
    }).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
