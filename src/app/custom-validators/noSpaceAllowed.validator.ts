import { FormControl, Validators } from "@angular/forms";

export class CustomValidator {
  static noSpaceAllowed(control: FormControl) {
    if (control.value !== null && control.value.indexOf(' ') !== -1) {
      return { noSpaceAllowed: true };
    } 
    return null;
  }
}

