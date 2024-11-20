import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, tap, catchError, startWith, distinctUntilChanged } from 'rxjs/operators';

export type SearchableDropdown<T> = {
    data: T[];
    searchTerm$: BehaviorSubject<string>;
    loading: boolean;
    page: number;
    selected: null | T;
    loadMore: () => void;
};

@Injectable({
    providedIn: 'root',
})
export class DropdownService {
    public debounceTime = 300;

    createDropdownModel<T>(
        fetchData: (searchTerm: string, page: number) => Observable<{ content: T[] }>,
        handleError?: (error: any) => void
    ): SearchableDropdown<T> {
        const dropdown: SearchableDropdown<T> = {
            data: [] as Array<T>,
            searchTerm$: new BehaviorSubject<string>(''),
            loading: false,
            page: 1,
            selected: null,
            loadMore: () => {
                dropdown.loading = true;
                this.fetchData<T>(dropdown, fetchData, handleError).subscribe((response) => {

                    dropdown.data = [...dropdown.data, ...response.content];
                    dropdown.page++;
                    dropdown.loading = false;
                });
            },
        };


        dropdown.searchTerm$
            .pipe(
                startWith(''),
                debounceTime(this.debounceTime),
                distinctUntilChanged(),
                tap(() => {
                    dropdown.page = 1;
                    dropdown.loading = true;
                })
            )
            .subscribe(() => {
                this.fetchData<T>(dropdown, fetchData, handleError).subscribe((response) => {
                    dropdown.data = response.content;
                    dropdown.loading = false;
                });
            });

        return dropdown;
    }

    private fetchData<T>(
        dropdown: SearchableDropdown<T>,
        fetchData: (searchTerm: string, page: number) => Observable<{ content: T[] }>,
        handleError?: (error: any) => void
    ): Observable<{ content: T[] }> {
        return fetchData(dropdown.searchTerm$.value, dropdown.page).pipe(
            catchError((error) => {
                console.error('Error fetching data:', error);
                dropdown.loading = false;
                if (handleError) handleError(error);
                return of({ content: [] });
            })
        );
    }
}
