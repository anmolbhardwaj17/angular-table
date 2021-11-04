import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';


export interface InternshipData {
  date: string;
  rcptType: string;
  rcpt: number;
  items:  number;
  totalQty:  number;
  receptSubtotal:  number;
  receptDisc:  number;
  receptAmt:  number;
  ptsPeeps:  number;
  stores:  number;
  tenderType: string;
  cashier: string;
}

const ELEMENT_DATA: InternshipData[] = [
  {date: "09/23/2021", rcptType: "Sale", rcpt: 148930, items: 3, totalQty: 20, receptSubtotal: 600, receptDisc: 30, receptAmt: 570,ptsPeeps:570, stores: 4, tenderType: "Credit", cashier:"JESSICPI"},
  {date: "12/22/2019", rcptType: "Sale", rcpt: 148930, items: 3, totalQty: 20, receptSubtotal: 600, receptDisc: 30, receptAmt: 575,ptsPeeps:153, stores: 4, tenderType: "Credit", cashier:"AISH"},
  {date: "09/23/2020", rcptType: "Sale", rcpt: 456451, items: 100, totalQty: 250, receptSubtotal: 12, receptDisc: 30, receptAmt: 270,ptsPeeps:789, stores: 2, tenderType: "Debit", cashier:"MIA"},
  {date: "09/10/2021", rcptType: "Sale", rcpt: 2556453, items: 3, totalQty: 520, receptSubtotal: 1210, receptDisc: 30, receptAmt: 470,ptsPeeps:513, stores: 43, tenderType: "Credit", cashier:"RAMESH"},
  {date: "12/21/2021", rcptType: "Sale", rcpt: 5465623, items: 45, totalQty: 220, receptSubtotal: 6000, receptDisc: 30, receptAmt: 570,ptsPeeps:134, stores: 5, tenderType: "Credit", cashier:"ANMOL"},
  {date: "04/05/2021", rcptType: "Sale", rcpt: 321310, items:3, totalQty: 206, receptSubtotal: 9465, receptDisc: 30, receptAmt: 5340,ptsPeeps:4623, stores: 6, tenderType: "Debit", cashier:"JORDAN"},
  {date: "09/05/2021", rcptType: "Sale", rcpt: 6456453, items: 33, totalQty: 200, receptSubtotal: 2300, receptDisc: 30, receptAmt: 3470,ptsPeeps:5433, stores: 7, tenderType: "Credit", cashier:"JESSICPI"},
  {date: "04/23/2021", rcptType: "Sale", rcpt: 6456543, items: 341, totalQty: 20, receptSubtotal: 4200, receptDisc: 30, receptAmt: 570,ptsPeeps:312, stores: 8, tenderType: "Credit", cashier:"HITESH"},
  {date: "09/07/2020", rcptType: "Sale", rcpt: 19756, items: 987, totalQty: 209, receptSubtotal: 9872, receptDisc: 30, receptAmt: 30,ptsPeeps:467, stores:49, tenderType: "Debit", cashier:"HITESH"},
  {date: "12/09/2021", rcptType: "Sale", rcpt: 464533, items: 420, totalQty: 26, receptSubtotal: 4530, receptDisc: 30, receptAmt: 364,ptsPeeps:897, stores: 4, tenderType: "Credit", cashier:"JESS"},
  {date: "09/06/2020", rcptType: "Sale", rcpt: 12456, items: 69, totalQty: 27, receptSubtotal: 4520, receptDisc: 30, receptAmt: 456,ptsPeeps:532, stores: 5, tenderType: "Credit", cashier:"HITESH"},
  {date: "04/23/2021", rcptType: "Sale", rcpt: 43329, items: 3, totalQty: 40, receptSubtotal: 6699, receptDisc: 30, receptAmt: 570,ptsPeeps:570, stores: 21, tenderType: "Debit", cashier:"ROCK"},
  {date: "12/09/2021", rcptType: "Sale", rcpt: 451332, items: 96, totalQty: 29, receptSubtotal: 789, receptDisc: 30, receptAmt: 987,ptsPeeps:965, stores: 13, tenderType: "Debit", cashier:"JHITESH"},
  {date: "12/22/2019", rcptType: "Sale", rcpt: 148930, items: 3, totalQty: 20, receptSubtotal: 600, receptDisc: 30, receptAmt: 575,ptsPeeps:153, stores: 4, tenderType: "Credit", cashier:"AISH"},
  {date: "09/23/2020", rcptType: "Sale", rcpt: 456451, items: 100, totalQty: 250, receptSubtotal: 12, receptDisc: 30, receptAmt: 270,ptsPeeps:789, stores: 2, tenderType: "Debit", cashier:"MIA"},
  {date: "09/10/2021", rcptType: "Sale", rcpt: 2556453, items: 3, totalQty: 520, receptSubtotal: 1210, receptDisc: 30, receptAmt: 470,ptsPeeps:513, stores: 43, tenderType: "Credit", cashier:"RAMESH"},
  {date: "12/21/2021", rcptType: "Sale", rcpt: 5465623, items: 45, totalQty: 220, receptSubtotal: 6000, receptDisc: 30, receptAmt: 570,ptsPeeps:134, stores: 5, tenderType: "Credit", cashier:"ANMOL"},
  {date: "04/05/2021", rcptType: "Sale", rcpt: 321310, items:3, totalQty: 206, receptSubtotal: 9465, receptDisc: 30, receptAmt: 5340,ptsPeeps:4623, stores: 6, tenderType: "Debit", cashier:"JORDAN"},
  {date: "09/05/2021", rcptType: "Sale", rcpt: 6456453, items: 33, totalQty: 200, receptSubtotal: 2300, receptDisc: 30, receptAmt: 3470,ptsPeeps:5433, stores: 7, tenderType: "Credit", cashier:"JESSICPI"},
  {date: "04/23/2021", rcptType: "Sale", rcpt: 6456543, items: 341, totalQty: 20, receptSubtotal: 4200, receptDisc: 30, receptAmt: 570,ptsPeeps:312, stores: 8, tenderType: "Credit", cashier:"HITESH"},
  {date: "09/07/2020", rcptType: "Sale", rcpt: 19756, items: 987, totalQty: 209, receptSubtotal: 9872, receptDisc: 30, receptAmt: 30,ptsPeeps:467, stores:49, tenderType: "Debit", cashier:"HITESH"},
  {date: "12/09/2021", rcptType: "Sale", rcpt: 464533, items: 420, totalQty: 26, receptSubtotal: 4530, receptDisc: 30, receptAmt: 364,ptsPeeps:897, stores: 4, tenderType: "Credit", cashier:"JESS"},
  {date: "09/06/2020", rcptType: "Sale", rcpt: 12456, items: 69, totalQty: 27, receptSubtotal: 4520, receptDisc: 30, receptAmt: 456,ptsPeeps:532, stores: 5, tenderType: "Credit", cashier:"HITESH"},
  {date: "04/23/2021", rcptType: "Sale", rcpt: 43329, items: 3, totalQty: 40, receptSubtotal: 6699, receptDisc: 30, receptAmt: 570,ptsPeeps:570, stores: 21, tenderType: "Debit", cashier:"ROCK"},
  {date: "12/09/2021", rcptType: "Sale", rcpt: 451332, items: 96, totalQty: 29, receptSubtotal: 789, receptDisc: 30, receptAmt: 987,ptsPeeps:965, stores: 13, tenderType: "Debit", cashier:"JHITESH"},
  {date: "12/22/2019", rcptType: "Sale", rcpt: 148930, items: 3, totalQty: 20, receptSubtotal: 600, receptDisc: 30, receptAmt: 575,ptsPeeps:153, stores: 4, tenderType: "Credit", cashier:"AISH"},
  {date: "09/23/2020", rcptType: "Sale", rcpt: 456451, items: 100, totalQty: 250, receptSubtotal: 12, receptDisc: 30, receptAmt: 270,ptsPeeps:789, stores: 2, tenderType: "Debit", cashier:"MIA"},
  {date: "09/10/2021", rcptType: "Sale", rcpt: 2556453, items: 3, totalQty: 520, receptSubtotal: 1210, receptDisc: 30, receptAmt: 470,ptsPeeps:513, stores: 43, tenderType: "Credit", cashier:"RAMESH"},
  {date: "12/21/2021", rcptType: "Sale", rcpt: 5465623, items: 45, totalQty: 220, receptSubtotal: 6000, receptDisc: 30, receptAmt: 570,ptsPeeps:134, stores: 5, tenderType: "Credit", cashier:"ANMOL"},
  {date: "04/05/2021", rcptType: "Sale", rcpt: 321310, items:3, totalQty: 206, receptSubtotal: 9465, receptDisc: 30, receptAmt: 5340,ptsPeeps:4623, stores: 6, tenderType: "Debit", cashier:"JORDAN"},
  {date: "09/05/2021", rcptType: "Sale", rcpt: 6456453, items: 33, totalQty: 200, receptSubtotal: 2300, receptDisc: 30, receptAmt: 3470,ptsPeeps:5433, stores: 7, tenderType: "Credit", cashier:"JESSICPI"},
  {date: "04/23/2021", rcptType: "Sale", rcpt: 6456543, items: 341, totalQty: 20, receptSubtotal: 4200, receptDisc: 30, receptAmt: 570,ptsPeeps:312, stores: 8, tenderType: "Credit", cashier:"HITESH"},
  {date: "09/07/2020", rcptType: "Sale", rcpt: 19756, items: 987, totalQty: 209, receptSubtotal: 9872, receptDisc: 30, receptAmt: 30,ptsPeeps:467, stores:49, tenderType: "Debit", cashier:"HITESH"},
  {date: "12/09/2021", rcptType: "Sale", rcpt: 464533, items: 420, totalQty: 26, receptSubtotal: 4530, receptDisc: 30, receptAmt: 364,ptsPeeps:897, stores: 4, tenderType: "Credit", cashier:"JESS"},
  {date: "09/06/2020", rcptType: "Sale", rcpt: 12456, items: 69, totalQty: 27, receptSubtotal: 4520, receptDisc: 30, receptAmt: 456,ptsPeeps:532, stores: 5, tenderType: "Credit", cashier:"HITESH"},
  {date: "04/23/2021", rcptType: "Sale", rcpt: 43329, items: 3, totalQty: 40, receptSubtotal: 6699, receptDisc: 30, receptAmt: 570,ptsPeeps:570, stores: 21, tenderType: "Debit", cashier:"ROCK"},
  {date: "12/09/2021", rcptType: "Sale", rcpt: 451332, items: 96, totalQty: 29, receptSubtotal: 789, receptDisc: 30, receptAmt: 987,ptsPeeps:965, stores: 13, tenderType: "Debit", cashier:"JHITESH"},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  displayedColumns: string[] = ['date', 'rcptType', 'rcpt', 'items', 'totalQty', 'receptSubtotal', 'receptDisc', 'receptAmt', 'ptsPeeps', 'stores', 'tenderType', 'cashier'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
