import { AbstractControl, FormControl } from "@angular/forms";

export function setBackendError(formControl: AbstractControl, message: string) {
    formControl.setErrors({ backend: message });
}