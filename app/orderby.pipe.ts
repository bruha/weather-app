import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(array:Array<any>, arg) {
        if (array && arg) {
            let orderByValue = arg;
            let byVal = 1;
            if (orderByValue.charAt(0) === '!') {
                byVal = -1;
                orderByValue = orderByValue.substring(1);
            }
            array.sort((a: any, b: any) => {
                orderByValue.split('.').forEach(prop => {
                    a = a && a[prop];
                    b = b && b[prop];
                });
                if ( a < b ) { return -byVal; }
                else if ( a > b ) { return byVal; }
                else { return 0; }
            });
        }
        return array;
    }
}
