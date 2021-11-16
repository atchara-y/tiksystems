import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  tabs = [];
  links = [];
  activeLink;
  selected = new FormControl(0);
  currentRoute: string;

  navHeaderText = {
    registration: 'Registration',
    searchUser: 'Search user',
    about: 'About',
  };

  paths = {
    main: '/main',
    registration: '/main/registration',
    searchUser: '/main/search',
    about: '/main/about',
  };

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.navigate([this.paths.main]);
  }

  addLink(event, link) {
    const tabHeader = event.target.textContent;
    const path = this.paths;
    const headerText = this.navHeaderText;
    if (this.links.includes(tabHeader) === false) {
      if (link === path.registration) {
        this.links.push(headerText.registration);
        this.activeLink = headerText.registration;
      } else if (link === path.searchUser) {
        this.links.push(headerText.searchUser);
        this.activeLink = headerText.searchUser;
      } else if (link === path.about) {
        this.links.push(headerText.about);
        this.activeLink = headerText.about;
      }
    } else {
      if (link === path.registration) {
        this.activeLink = headerText.registration;
      } else if (link === path.searchUser) {
        this.activeLink = headerText.searchUser;
      } else if (link === path.about) {
        this.activeLink = headerText.about;
      }
    }
  }

  onTabSelectChange(link) {
    this.activeLink = link;
    this.checkMatchLink();
  }

  checkMatchLink() {
    if (this.activeLink === this.navHeaderText.registration) {
      this.router.navigate([this.paths.registration]);
    } else if (this.activeLink === this.navHeaderText.searchUser) {
      this.router.navigate([this.paths.searchUser]);
    } else if (this.activeLink === this.navHeaderText.about) {
      this.router.navigate([this.paths.about]);
    } else {
      this.router.navigate([this.paths.main]);
    }
  }

  removeTab(index: number) {
    this.links.splice(index, 1);
    this.activeLink = index === 0 ? this.links[0] : this.links[index - 1];
    this.checkMatchLink();
    if (this.links.length === 0) {
      this.router.navigate([this.paths.main]);
      this.activeLink = null;
    }
  }
}
