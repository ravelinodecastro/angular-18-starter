import { Component, Input, OnInit, ViewChild, EventEmitter, Output, ContentChildren, TemplateRef, QueryList } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { colDef, SlotDirective } from '@bhplugin/ng-datatable';
import { BaseService } from '../../services/base.service';
import { BaseFilter } from '../../models/base.filter';
import { BaseModel } from '../../models/base.model';

type ChangeServer = {
    change_type: "page" | "filter" | "search",
    column_filters: colDef[],
    current_page: number,
    offset: number,
    pagesize: number,
    search: string,
    sort_column: string,
    sort_direction: "asc" | "desc"
};

@Component({
    selector: 'app-base-list',
    templateUrl: './base-list.component.html',
    styleUrls: []
})
export class BaseListComponent<M, C, U> implements OnInit {
    @ViewChild('baseFormModal') baseFormModal!: NgxCustomModalComponent;

    @ViewChild('deleteModal') deleteModal!: NgxCustomModalComponent;

    @Input() resourceLabel: string = '';

    @Input() creatable: boolean = true;

    @Input() updatable: boolean = true;

    @Input() deletable: boolean = true;

    @Input() cols: colDef[] = [];
    @Input({required: true}) baseService!: BaseService<M, C, U, BaseFilter>;
    
    @Output() changeServerEvent = new EventEmitter<ChangeServer>();

    @ContentChildren(SlotDirective) slots!: QueryList<SlotDirective>;
    @ViewChild('defaultTemplate', { static: true }) defaultTemplate!: TemplateRef<any>;
    slotsMap: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();

    readOnly: boolean = false;

    loading: boolean = false;
    pagination = { totalRows: 0, size: 10, page: 1 };
    sort: string[] = [];
    private searchSubject = new Subject<string>();

    rows: M[] = [];
    selectedItem?: M;
    search: string = '';

    constructor() {}

    ngOnInit(): void {
        this.getPaginated();
        this.onSearch();
    }

    ngAfterContentInit() {
        this.slots.forEach((template) => {
            const fieldName = template.fieldName;
            if (fieldName) {
                this.slotsMap.set(fieldName, template.templateRef);
            }
        });
    }

    openFormModal(item?: M, readOnly?: boolean): void {
        this.selectedItem = item;
        this.readOnly = !!readOnly;
        this.baseFormModal.open();
    }

    openDeleteModel(item: M): void {
        this.selectedItem = item;
        this.deleteModal.open();
    }
    closeDeleteModal() {
        this.deleteModal.close()
    }

    getPaginated(): void {
        this.loading = true;
        this.baseService.findAll({
            size: this.pagination.size,
            page: this.pagination.page,
            sort: this.sort,
            search: this.search
        })
        .pipe(finalize(() => this.loading = false))
        .subscribe({
            next: (response) => {
                this.rows = response.content;
                this.pagination.totalRows = response.totalElements;
            }
        });
    }

    deleteItem(): void {
        this.loading = true;
        this.baseService.remove((this.selectedItem as BaseModel).id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
            next: () => {
               this.closeDeleteModal();
               this.getPaginated();
            }
        });
    }

    onSearch(): void {
        this.searchSubject.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(searchTerm => {
            this.search = searchTerm;
            this.pagination.page = 1;
            this.getPaginated();
        });
    }

    changeServer(data: ChangeServer): void {
        if (data.change_type === 'search') {
            this.searchSubject.next(data.search);
        } else {
            this.updatePaginationAndSort(data);
            this.getPaginated();
        }

        this.changeServerEvent.emit(data);
    }

    private updatePaginationAndSort(data: ChangeServer): void {
        this.pagination.page = data.current_page;
        this.pagination.size = data.pagesize;
        this.sort = [data.sort_column];
    }

    hasSlot(fieldName: string = ''): boolean {
        return this.slotsMap.has(fieldName);
    }
    getSlot(fieldName: string = ''): TemplateRef<any> {
        return this.slotsMap.get(fieldName) || this.defaultTemplate;
    }
}
