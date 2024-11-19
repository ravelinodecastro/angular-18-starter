import { FormBuilder, AbstractControlOptions, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ModelFormGroup } from './model-form-group';

@Injectable({
    providedIn: 'root'
})
export class StrictFormBuilder extends FormBuilder {
    override group<T>(controlsConfig: {
        [K in keyof T]: any;
    }, options?: AbstractControlOptions | { [key: string]: any } | null): ModelFormGroup<T> {
        const controls = {} as { [K in keyof T]: FormControl<T[K]> };

        (Object.keys(controlsConfig) as Array<keyof T>).forEach(key => {
            if (Array.isArray(controlsConfig[key])) {
                controls[key] = new FormControl<T[keyof T]>(controlsConfig[key][0], controlsConfig[key][1]);
            } else {
                controls[key] = new FormControl<T[keyof T]>(controlsConfig[key], controlsConfig[key]);
            }
        });

        return new ModelFormGroup<T>(controls, options);
    }
}