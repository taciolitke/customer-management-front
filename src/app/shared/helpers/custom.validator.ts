import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidator {

    static checkExistsOnList(itens: any[]): ValidatorFn {
        return (c: AbstractControl): {} => {
            const selection: any = c.value;
            if (!selection) {
                return null;
            }
            if (itens.some(x => x === selection)) {
                return null;
            }
            return { checkExistsOnList: { incorrect: true } };
        };
    }
    static checkExistsOnListkWithAtribute(items: any[], attribute: string): ValidatorFn {
        return (c: AbstractControl): {} => {
            const selection: any = c.value;
            if (!selection) {
                return null;
            }
            if (items.map(e => e[attribute]).indexOf(selection) === -1) {
                return { checkExistsOnListkWithAtribute: { incorrect: true } };
            }
            return null;
        };
    }
    static invalid(): ValidatorFn {
        return (c: AbstractControl): {} => {
            return { invalid: { incorrect: true } };
        };
    }
}