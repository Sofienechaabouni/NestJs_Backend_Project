import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(monTab: string[], metadata: ArgumentMetadata) {
    console.log(metadata);
    console.log(monTab);
    return monTab;
  }
}
