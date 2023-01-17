import { Injectable, NotFoundException } from '@nestjs/common';
import { addTodoDto } from './dto/add-todo.dto';
import { Todo } from './entities/todo.entity';
@Injectable()
export class TodoService {
  todos: Todo[] = [];
  getTodos(): Todo[] {
    return this.todos;
  }
  addTodo(newTodo: addTodoDto): Todo {
    const { name, description } = newTodo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    const todo = {
      id,
      name,
      description,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }
  getTodoById(id: number): Todo {
    const todo = this.todos.find((curr) => curr.id === id);
    if (todo) return todo;
    throw new NotFoundException('pas trouve celui avec lid fournit');
  }
  deleteTodo(id: number) {
    //chercher Lobjet via le tableau
    const idx = this.todos.findIndex((todo) => todo.id === +id);
    if (idx >= 0) this.todos.splice(idx, 1);
    else {
      throw new NotFoundException('nexiste pas');
    }
    return { message: 'delete todoo', count: 1 };
  }
  updateTodo(id: number, newTodo: Partial<Todo>) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;

    return todo;
  }
}
