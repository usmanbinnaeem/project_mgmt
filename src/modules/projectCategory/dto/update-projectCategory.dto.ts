import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectCategoryDto } from './create-projectCategory.dto';

export class UpdateProjectCategoryDto extends PartialType(CreateProjectCategoryDto) { }
