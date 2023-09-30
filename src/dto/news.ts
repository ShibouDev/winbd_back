import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class NewsCreateDTO {
  @Expose()
  @IsString()
  user: string;

  @Expose()
  @IsString()
  rawText: string;
}
