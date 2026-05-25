package com.api.person.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Person {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "O campo nome não pode ficar em branco")
    @Size(min = 3, max = 20, message = "O nome precisa ter entre 3 e 20 caracteres")
    private String name;
    
    @NotBlank(message = "O campo cidade não pode ficar em branco")
    @Size(min = 3, max = 20, message = "A cidade precisa ter entre 3 e 20 caracteres")
    private String city;
}
