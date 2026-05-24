package com.api.person.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.api.person.model.Person;
import com.api.person.service.PersonService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

// Liberar CORS de qualquer origem
@CrossOrigin("*")
@RestController
public class PersonController {

    @Autowired
    private PersonService personService;

        @PostMapping("/register")
        public ResponseEntity<Person> registerPerson(@Valid @RequestBody Person obj) {
            Person newObj = personService.createPerson(obj);
            return ResponseEntity.status(HttpStatus.CREATED).body(newObj);
        }

        @GetMapping("/select/{id}")
        public ResponseEntity<Person> findPersonById(@PathVariable Integer id) {
            Person person = personService.findPersonById(id);
            return ResponseEntity.status(HttpStatus.OK).body(person);
        }

        @GetMapping("/select")
        public ResponseEntity<Iterable<Person>> selectAllPeople() {
            Iterable<Person> people = personService.findAllPeople();
            return ResponseEntity.status(HttpStatus.OK).body(people);
        }

        @PutMapping("/update/{id}")
        public ResponseEntity<Person> updatePerson(@Valid @RequestBody Person obj, @PathVariable Integer id) {
            Person newObj = personService.updatePerson(obj, id);
            return ResponseEntity.status(HttpStatus.OK).body(newObj);
        }

        @DeleteMapping("/remove/{id}")
        public ResponseEntity<Void> deletePerson(@PathVariable Integer id) {
            personService.deletePerson(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        
    }
