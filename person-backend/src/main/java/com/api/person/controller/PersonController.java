package com.api.person.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.api.person.model.Person;
import com.api.person.repository.PersonRepository;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

// Liberar CORS de qualquer origem
@CrossOrigin("*")
@RestController
public class PersonController {

   @Autowired
   private PersonRepository personRepository;
 
    @GetMapping("/")
     public String helloWorld() {
        return "Hello World";
     }

     @PostMapping("/register")
     public Person registerPerson(@Valid @RequestBody Person obj) {
         return this.personRepository.save(obj);
     }

     @GetMapping("/select/{id}")
    public Person selectPersonById(
        @PathVariable Integer id) {

        return this.personRepository
            .findById(id)
            .orElse(null);
    }

     @GetMapping("/select")
     public Iterable<Person> selectAllPeople() {
         return this.personRepository.findAll();
     }

     @PutMapping("/update/{id}")
     public Person updatePerson(@Valid @RequestBody Person obj, @PathVariable Integer id) {
         obj.setId(id);
         return this.personRepository.save(obj);
     }

     @DeleteMapping("/remove/{id}")
     public void deletePerson(@PathVariable Integer id) {
         this.personRepository.deleteById(id);
     }
     
}
