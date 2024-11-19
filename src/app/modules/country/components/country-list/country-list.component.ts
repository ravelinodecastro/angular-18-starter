import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
@Component({
    selector: 'app-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: []
})
export class CountryListComponent {

    cols = [
        { field: 'name', title: 'Nome' },
        { field: 'code', title: 'Código do País' },
        { field: 'createdAt', title: 'Criado aos' },
        { field: 'action', title: 'Acções', sort: false },
    ];

    constructor(public countryService: CountryService) { }


}
