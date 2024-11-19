import { OnInit, Input, Component, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseModel } from "../models/base.model";
import { BaseService } from "../services/base.service";
import { finalize } from "rxjs";
import { NgxCustomModalComponent } from "ngx-custom-modal";

@Component({
    selector: 'app-base-form',
    template: '',
})
export abstract class BaseFormComponent<M, C, U, F> implements OnInit {

    @Input() model?: BaseModel;

    @Input() readOnly: boolean = false;

    @Input() modal?: NgxCustomModalComponent;

    @Output() onComplete = new EventEmitter<void>();

    abstract form: FormGroup;

    loading: boolean = false;

    constructor(private baseService: BaseService<M, C, U, F>) {

    }

    ngOnInit(): void {
        this.initForm(this.model);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['model'] && !changes['model'].firstChange) {
            this.initForm(this.model);
        }
    }

    closeModal() {
        this.modal?.close();
    }

    getFieldError(fieldName: keyof C): string {
        const field = this.form.get(fieldName as string);
        if (field?.errors && (field.touched || field.dirty)) {
            if (field.errors['required']) {
                return 'Campo obrigatório';
            } else if (field.errors['backend']) {
                return field.errors['backend'];
            }
        }
        return '';
    }

    abstract initForm(model?: BaseModel): void;

    activateReadOnlyForm() {
        if (this.readOnly) {
            this.form.disable();
        }
    }

    submit() {
        if (this.form.valid) {
            this.loading = true;
            (this.model ?
                this.baseService.update(this.model.id, this.form.value)
                : this.baseService.create(this.form.value))
                .pipe(
                    finalize(() => this.loading = false)
                )
                .subscribe({
                    next: () => {
                        this.initForm();
                        this.closeModal();
                        this.onComplete.emit();
                    }
                })
        } else {
            Object.keys(this.form.controls).forEach(field => {
                const control = this.form.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }

    }

}