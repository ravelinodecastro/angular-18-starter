import { FormGroup, FormControl } from '@angular/forms';

export class ModelFormGroup<T> extends FormGroup<{
    [K in keyof T]: FormControl<T[K] >;
}> {
    override get<K extends keyof T>(key: K): FormControl<T[K]> {
        return super.get(key as string) as FormControl<T[K]>;
    }
}