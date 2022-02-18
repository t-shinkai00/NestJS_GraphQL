import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './models/todo.models';

@Injectable()
export class TodoService {
  // 今回はDBと接続しないのでメモリ上にTodoを保存
  private todos: Todo[] = [];

  // 全件取得のメソッド
  findAll(): Todo[] {
    return this.todos;
  }

  // idを元に一件取得のメソッド
  findById(id: string): Todo {
    const result = this.todos.find((todo) => id === todo.id);

    // なかったら404エラー
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
