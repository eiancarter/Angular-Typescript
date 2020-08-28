import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {

    transform(items: any[], inputText: string): any[] {
        if (!items) {
            return [];
        }
        if (!inputText) {
            return items;
        }
        inputText = inputText.toLocaleLowerCase();
        return items.filter((result: any) => result.name.toLocaleLowerCase().includes(inputText));
    }
}