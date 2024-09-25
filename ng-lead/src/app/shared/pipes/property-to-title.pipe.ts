import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyToTitle',
  standalone: true,
})
export class PropertyToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Convert camelCase to space-separated words and capitalize each word
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between camelCase words
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first word
  }
}
