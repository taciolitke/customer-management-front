import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContactModel } from '../shared/contact.model';
import { ContactService } from '../shared/contact.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ContactFilterModel } from '../shared/contact-filter.model';
import { UserModel } from 'src/app/autentication/shared/user.model';
import { AuthService } from 'src/app/autentication/shared/auth.service';
import { LocationService } from 'src/app/shared/locations/location.service';
import { LocationModel } from 'src/app/shared/locations/location.model';
import { UserService } from 'src/app/shared/users/user.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ValueTransformer } from '@angular/compiler/src/util';
import { CustomValidator } from 'src/app/shared/helpers/custom.validator';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  displayedColumns: string[] = ['classification', 'name', 'phone', 'gender', 'city', 'region', 'lastPurchase'];

  dataSource: MatTableDataSource<ContactModel>;

  loading = false;

  currentUser: UserModel;

  contactsFilter: ContactFilterModel;

  formFilter: FormGroup;

  nameFilter: FormControl;
  genderFilter: FormControl;
  cityFilter: FormControl;
  regionFilter: FormControl;
  lastPurchaseStartFilter: FormControl;
  lastPurchaseEndFilter: FormControl;
  classificationFilter: FormControl;
  sellerFilter: FormControl;

  locations: Array<LocationModel>;
  sellers: Array<string>;
  classifications: Array<string>;

  filteredLocations: Observable<Array<LocationModel>>;

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private locationService: LocationService,
    private userService: UserService) { }

  ngOnInit() {
    this.setContacts();
    this.buildForm();
    this.loadListsCombo();
    this.setUserType();

  }
  loadListsCombo() {
    this.loadLocations();
    this.loadSellers();
    this.loadClassifications();
  }
  setUserType() {
    this.currentUser = this.authService.getActiveUserLocalStorage();
    if (this.currentUser.isAdministrator) {
      this.displayedColumns.push('seller');
    }
  }
  loadLocations() {
    this.locationService.getRegions().subscribe(result => {
      this.loadLocationsCallback(result);
    });
  }
  loadSellers() {
    this.userService.getSellers().subscribe(result => {
      this.sellers = result.data;
    });
  }
  loadClassifications() {
    this.contactService.getClassifications().subscribe(result => {
      this.classifications = result.data;
    });
  }
  loadLocationsCallback(data: Array<LocationModel>) {
    this.locations = data;

    this.cityFilter.setValidators(CustomValidator.checkExistsOnListkWithAtribute(this.locations, 'capital'));
    this.cityFilter.setValidators(CustomValidator.checkExistsOnList(this.locations));

    this.filteredLocations = this.cityFilter.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLocations(value && value.capital ? value.capital : value))
    );
  }
  clearFields() {
    this.buildForm();
  }
  buildForm() {

    this.contactsFilter = new ContactFilterModel();

    this.nameFilter = new FormControl();
    this.genderFilter = new FormControl();
    this.cityFilter = new FormControl();
    this.regionFilter = new FormControl({ value: '', disabled: true });
    this.lastPurchaseStartFilter = new FormControl();
    this.lastPurchaseEndFilter = new FormControl();
    this.classificationFilter = new FormControl();
    this.sellerFilter = new FormControl();

    this.cityFilter.valueChanges.subscribe(value => {
      this.regionFilter.setValue(value && value.name ? (value.name + ' - ' + value.region) : '');
    });

    this.formFilter = new FormGroup({
      nameFilter: this.nameFilter,
      genderFilter: this.genderFilter,
      cityFilter: this.cityFilter,
      regionFilter: this.regionFilter,
      lastPurchaseStartFilter: this.lastPurchaseStartFilter,
      lastPurchaseEndFilter: this.lastPurchaseEndFilter,
      classificationFilter: this.classificationFilter,
      sellerFilter: this.sellerFilter,
    });
  }
  setContacts() {
    this.loading = true;
    this.contactService.list(this.contactsFilter).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.data);
      this.loading = false;
    });
  }
  search() {
    this.contactsFilter.name = this.nameFilter.value;
    this.contactsFilter.gender = this.genderFilter.value;
    this.contactsFilter.city = this.cityFilter.value ? this.cityFilter.value.capital : null;
    this.contactsFilter.region = this.cityFilter.value ? this.cityFilter.value.name : null;
    this.contactsFilter.lastPurchaseStart = this.lastPurchaseStartFilter.value ? new Date(this.lastPurchaseStartFilter.value).toISOString() : null;
    this.contactsFilter.lastPurchaseEnd = this.lastPurchaseEndFilter.value ? new Date(this.lastPurchaseEndFilter.value).toISOString() : null;
    this.contactsFilter.classification = this.classificationFilter.value;
    this.contactsFilter.seller = this.sellerFilter.value;

    this.setContacts();
  }
  displayLocationFn(location: LocationModel): string {
    return location ? location.capital : null;
  }
  private _filterLocations(value: string): Array<LocationModel> {
    if (!value) {
      return this.locations;
    }
    const filterValue = value.toLowerCase();
    return this.locations.filter(option => option.capital.toLowerCase().includes(filterValue));
  }
}
