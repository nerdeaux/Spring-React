package com.caylem.bootcamp.spring.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardCodedService {

    private static List<Todo> todos = new ArrayList<>();

    private static long idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "Caylem", "Learn to Dance", new Date(), false));
        todos.add(new Todo(++idCounter, "Caylem", "Travel to Peru", new Date(), false));
        todos.add(new Todo(++idCounter, "Caylem", "Create a Video Game", new Date(), false));
        todos.add(new Todo(++idCounter, "Caylem", "Travel the World", new Date(), false));
        todos.add(new Todo(++idCounter, "Caylem", "Buy a bigger home", new Date(), false));
    }

    public List<Todo> findAll() {
        return todos;
    }

    public Todo save(Todo todo) {
        if(todo.getId()==-1 || todo.getId()==0) {
            todo.setId(++idCounter);
            todos.add(todo);
        } else {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);

        if(todo == null) return null;

        if(todos.remove(todo)) return todo;

        return null;
    }

    public Todo findById(long id) {
        for(Todo todo: todos) {
            if(todo.getId() == id) {
                return todo;
            }
        }
        return null;
    }
}
