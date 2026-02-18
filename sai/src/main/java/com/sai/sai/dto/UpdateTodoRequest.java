package com.sai.sai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateTodoRequest {
    @NotBlank(message = "Title cannot be blank")
    private String title;
    
    private String description;
    
    private Boolean completed;
}

