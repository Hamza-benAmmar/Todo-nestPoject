import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FusionPipe implements PipeTransform {
  transform({ skills }: any, metadata: ArgumentMetadata) {
    if (!skills) {
      return new BadRequestException('skills are missing ! ');
    }
    return metadata.type === 'body'
      ? skills.map((skill) => skill.toUpperCase()).join('-')
      : skills;
  }
}
