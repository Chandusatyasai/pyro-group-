package com.sai.sai.service;

import com.sai.sai.Repository.TodoRepository;
import com.sai.sai.dto.UpdateTodoRequest;
import com.sai.sai.entity.Todo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos(Boolean completed) {
        if (completed != null) {
            return todoRepository.findByCompleted(completed);
        }
        return todoRepository.findAll();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(@Valid Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, UpdateTodoRequest updateRequest) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        // Title is mandatory and validated by @NotBlank in DTO
        if (updateRequest.getTitle() != null) {
            todo.setTitle(updateRequest.getTitle().trim());
        }
        if (updateRequest.getDescription() != null) {
            todo.setDescription(updateRequest.getDescription().trim());
        }
        if (updateRequest.getCompleted() != null) {
            todo.setCompleted(updateRequest.getCompleted());
        }

        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }
}

