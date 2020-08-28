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
        return items.filter((result: any) => {
            return result.name.toLocaleLowerCase().includes(inputText) || result.brewery_type.toLocaleLowerCase().includes(inputText) || result.website_url.toLocaleLowerCase().includes(inputText) || result.city.toLocaleLowerCase().includes(inputText) || result.state.toLocaleLowerCase().includes(inputText)
        });
    }
}