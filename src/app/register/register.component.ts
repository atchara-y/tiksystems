import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: [''],
    logo: [null],
    password: [''],
  });

  logoOptions = [
    {
      label: 'Logo 1',
      value: '/assets/images/female_avatar.png',
    },
    {
      label: 'Logo 2',
      value: '/assets/images/male_avatar.png',
    },
  ];

  logoPreview: string;
  selectedLogo: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
    const activeFormInput = this.userService.getActiveFormInput();
    if (activeFormInput) {
      this.form.setValue(activeFormInput);
      const activeLogo = activeFormInput.logo;
      if (activeLogo) {
        this.selectedLogo = activeLogo;
      }
    }
    this.form.valueChanges.subscribe((value) => {
      this.userService.updateFormInput(value);
    });
  }

  ngOnInit(): void {}

  onSave() {
    const userInfo = this.form.value;
    this.userService.addUser(userInfo);
  }

  onSelectLogoChange(event) {
    this.selectedLogo = event.value;
  }

  onClearForm() {
    this.form.reset();
    this.selectedLogo = null;
  }
}
