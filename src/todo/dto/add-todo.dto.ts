// import { IsString } from 'class-validator';
// import {
//   IsNotEmpty,
//   MaxLength,
//   MinLength,
// } from 'class-validator/types/decorator/decorators';

export class addTodoDto {
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(6, {
  //   message: 'la taille minimale du champ name est  de 6 caracteres',
  // })
  // @MaxLength(10)
  name: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(6)
  description: string;
}
