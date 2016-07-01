import {Component, View, OnInit, Input} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {statusFilterPipe, todoStatus} from './filter.ts';

@Component({
    selector: 'my-app',
    pipes: [statusFilterPipe],
    templateUrl: './src/app.html'
})

export class AppComponent  {
    todos: Todo[];
    toggleMode: boolean = true;
    filterStatus: todoStatus = todoStatus.all;

    constructor() {
        this.todos = [
            new Todo('Get Milk', false),
            new Todo('Brush Teeth', false)
        ];
    }

    showCompleted(){
        this.filterStatus = todoStatus.completed;
    }

    showActive(){
        this.filterStatus = todoStatus.active;
    }

    showAll(){
        this.filterStatus = todoStatus.all;
    }

    addTodo(newTodo){
        this.todos.unshift(new Todo(newTodo, false));
    }
    toggleTodoStatus(name: string){
        this.findToDo(name)
            .toggleStatus();
    }
    deleteTodo(name: string){
        let todo = this.findToDo(name);
        let index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
    }

    findToDo(name: string){
        var todo = this.todos.find((todo) => {
            return todo.name === name;
        });

        return todo;
    }
    
    getCount(isCompleted: boolean){
        let todos = this.todos.find((todo) => {
            return todo.isCompleted === isCompleted;
        });

        let count = (todos && todos.length) ? todos.length : 0;

        return count;
    }

    toggleAll(){
        this.todos.map((todo) => {
            return todo.isCompleted = this.toggleMode;
        });

        this.toggleMode = !(this.toggleMode);
    }
}

export class Todo {
    name: string;
    isCompleted: boolean = false;

    constructor(name: string, isCompleted: boolean){
        this.name = name;
        this.isCompleted = isCompleted;
    }

    toggleStatus(){
        this.isCompleted = !(this.isCompleted);
    }
}