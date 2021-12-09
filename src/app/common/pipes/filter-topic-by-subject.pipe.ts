import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTopicBySubject'
})
export class FilterTopicBySubjectPipe implements PipeTransform {

  transform(items: any[], searchText: any, filterMetadata: any): any[] {
    if (!items) return [];
    if (!searchText) {
      filterMetadata.count = items.length;
      return items;
    }
    // searchText = searchText.toLowerCase();

    let filteredItems = items.filter(it => {
        return it.subject.includes(searchText);
    });
    filterMetadata.count = filteredItems.length;
    return filteredItems;
  }

}
