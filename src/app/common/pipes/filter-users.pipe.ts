import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(items: any[], searchText: any, filterMetadata: any): any[] {
    if (!items) return [];
    if (!searchText) {
      filterMetadata.count = items.length;
      return items;
    }
    // searchText = searchText.toLowerCase();

    let filteredItems = items.filter(it => {
        return it.userInfo.userName.includes(searchText);
    });
    filterMetadata.count = filteredItems.length;
    return filteredItems;
  }

}
