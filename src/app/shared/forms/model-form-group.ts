import { FormGroup, FormControl } from '@angular/forms';

export class ModelFormGroup<T> extends FormGroup<{
    [K in keyof T]: FormControl<T[K] >;
}> {}