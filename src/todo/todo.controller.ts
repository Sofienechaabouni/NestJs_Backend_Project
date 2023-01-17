import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Req,
  Res,
  Body,
  Param,
  NotFoundException,
  Query,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe, UseInterceptors
} from "@nestjs/common";
import { Request, Response } from 'express';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion/upper-and-fusion.pipe';
import { addTodoDto } from './dto/add-todo.dto';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { DurationInterceptor } from "../interceptors/duration/duration.interceptor";
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('v2')
  getTodosV2(@Req() request: Request, @Res() reponse: Response) {
    console.log('liste des todos');
    reponse.json({ contenu: 'ici c json' });
    reponse.status(205);
  }
  @Get('/:id')
  getTodosById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
  ) {
    return this.todoService.getTodoById(id);
  }
  @Get()
  getTodos(@Query() mesQueries: GetPaginatedTodoDto): Todo[] {
    return this.todoService.getTodos();
  }

  @Post()
  addTodo(@Body() newTodo: addTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }
  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id) {
    this.todoService.deleteTodo(id);
  }
  @Put('/:id')
  modifierTodo(@Param('id', ParseIntPipe) id, @Body() newTodo: Partial<Todo>) {
    this.todoService.updateTodo(id, newTodo);
  }
  @Post('/pipe')
  testPipe(@Body() data) {
    return data;
  }
}
