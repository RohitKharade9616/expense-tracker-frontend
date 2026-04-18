import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonServices } from '../../../../shared/services/common-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatPaginator, MatIcon, CommonModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList implements OnChanges {
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  displayedColumns: string[] = ['Date', 'Description', 'Category', 'Amount', 'Actions'];

  // always use MatTableDataSource for built-in features like paginator/sort
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _expenseList: any[] = [];

  @Input() set expenseList(value: any[]) {
    // update only when there is a real change to avoid unnecessary re-renders
    this._expenseList = value || [];
    this.dataSource.data = this._expenseList;
    // if paginator already initialized, re‑assign
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  get expenseList(): any[] {
    return this._expenseList;
  }

  constructor(private commonServices: CommonServices) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenseList'] && this.expenseList) {
      // ensure paginator is attached when the input changes
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit() {
    // assign paginator once view is ready
    this.dataSource.paginator = this.paginator;
  }

  editExpense(element: any) {
    this.edit.emit(element);
  }

  /** trackBy for table rows improves rendering when list changes */
  trackByExpense(index: number, item: any) {
    return item && item.expenseId ? item.expenseId : index;
  }

  deleteExpense(element: any) {
    const id = element.expenseId;
    this.commonServices.deleteExpense(id).subscribe((res: any) => {
      if (res) {
        alert('Expense deleted successfully');
        // remove from the local array and update data source
        this._expenseList = this._expenseList.filter((expense: any) => expense.expenseId !== id);
        this.dataSource.data = this._expenseList;
        this.delete.emit(id);
      }
    });
  }
}