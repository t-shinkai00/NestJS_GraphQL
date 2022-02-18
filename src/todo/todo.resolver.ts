import { Resolver, Args, ID, Query } from '@nestjs/graphql';
import { Todo } from './models/todo.models';
import { TodoService } from './todo.service';

// Resolverデコレータでresolverを定義
@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  // QueryデコレータでQueryを定義
  // 第一引数にReturnTypeFuncを指定し、型を定義。ここではTodoの配列を指定
  // 第二引数にオプションとして{ nullable: 'items' }を与えることでから配列を許容する。[Todo]!と同義
  // デフォルトでは [Todo!]! になる。
  @Query(() => [Todo], { nullable: 'items' })
  findAll() {
    return this.todoService.findAll();
  }

  // Queryに引数がある場合はArgsデコレータで定義
  // 第一引数に引数の名前、第二引数に型を指定
  // schema上の型定義は findOneById(id: ID!): Todo! となる
  @Query(() => Todo)
  findOneById(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.findById(id);
  }
}
