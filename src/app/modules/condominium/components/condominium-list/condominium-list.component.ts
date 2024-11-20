import { Component } from '@angular/core';
import { CondominiumService } from '../../services/condominium.service';
@Component({
    selector: 'app-condominium-list',
    templateUrl: './condominium-list.component.html',
    styleUrls: []
})
export class CondominiumListComponent {

    cols = [
        { field: 'name', title: 'Nome' },
        { field: 'code', title: 'Código do País' },
        { field: 'createdAt', title: 'Criado aos' },
        { field: 'action', title: 'Acções', sort: false },
    ];

    constructor(public condominiumService: CondominiumService) { }


}
