import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

export interface SearchUserResultElement {
  position: number;
  fname: string;
  lname: number;
  logo: number;
}

const ELEMENT_DATA: SearchUserResultElement[] = [];

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  displayedColumns: string[] = ['position', 'fname', 'lname', 'logo'];
  dataSource = ELEMENT_DATA;
  textSearch = new FormControl(null);

  constructor(private userService: UserService) {
    const activeSearchText = this.userService.getActiveSearchText();
    const activeSearchResult = this.userService.getActiveSearchResult();
    if (activeSearchResult && activeSearchText) {
      this.dataSource = activeSearchResult;
      this.textSearch.setValue(activeSearchText);
    }
  }

  ngOnInit(): void {}

  onSearch() {
    this.dataSource = [];
    const result = this.userService.searchRegisteredUser(this.textSearch.value);
    this.userService.updateSearchText(this.textSearch.value);
    if (result.length > 0) {
      result.filter((data, i) => {
        const dataDisplay = {
          position: i + 1,
          fname: data.firstname,
          lname: data.lastname,
          logo: data.logo,
        };
        this.dataSource.push(dataDisplay);
      });
    }
    this.userService.updateSearchResult(this.dataSource);
    return this.dataSource;
  }

  onClear() {
    this.textSearch.setValue(null);
    this.dataSource = [];
  }
}
