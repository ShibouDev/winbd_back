import { Expose } from 'class-transformer';
import { IsBoolean, IsISO8601, IsOptional, IsString } from 'class-validator';

export class NewsCreateDTO {
  @Expose()
  @IsString()
  user: string;

  @Expose()
  @IsString()
  rawText: string;

  @Expose()
  @IsISO8601()
  @IsOptional()
  publicTime?: string;

  @Expose()
  @IsBoolean()
  publish: boolean;
}

export class NewsGetDTO {
  @Expose()
  @IsString()
  user: string;
}

export class NewsGetOneDTO {
  @IsString()
  @Expose()
  id: string;
}

export class NewsEditDTO {
  @IsString()
  @Expose()
  user: string;

  @IsString()
  @Expose()
  rawText: string;

  @IsString()
  @Expose()
  _id: string;
}

export class NewsDeleteDTO {
  @Expose()
  @IsString()
  id: string;
}
