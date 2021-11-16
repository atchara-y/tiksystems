import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // test data for seaching user
  registeredUser = [
    {
      firstname: 'Jen',
      lastname: 'Doe',
      logo: '/assets/images/female_avatar.png',
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      logo: '/assets/images/male_avatar.png',
    },
  ];

  // array to contain new user infomation from Registration page
  usersFromRegistrationPage = [];

  resultSearch;

  activeFormInput;
  activeSearchResult;
  activeSearchText;

  constructor() {}

  updateFormInput(value) {
    this.activeFormInput = value;
  }

  getActiveFormInput() {
    return this.activeFormInput;
  }

  updateSearchResult(result) {
    this.activeSearchResult = result;
  }

  getActiveSearchResult() {
    return this.activeSearchResult;
  }

  updateSearchText(searchText) {
    this.activeSearchText = searchText;
  }

  getActiveSearchText() {
    return this.activeSearchText;
  }

  addUser(userInfo) {
    if (userInfo) {
      this.usersFromRegistrationPage.push(userInfo);
    }
  }

  searchRegisteredUser(searchText) {
    this.resultSearch = [];
    if (searchText) {
      if (this.registeredUser) {
        this.registeredUser.find((user) => {
          const fname = user.firstname;
          const lname = user.lastname;
          if (fname === searchText || lname === searchText) {
            this.resultSearch.push(user);
          }
        });
      }
    }
    return this.resultSearch;
  }
}
