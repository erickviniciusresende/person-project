package com.api.person.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.person.model.Person;
import com.api.person.repository.PersonRepository;

@Service
public class PersonService {
    
    @Autowired
    private PersonRepository personRepository;

     public Person createPerson(Person obj) {
         return personRepository.save(obj);
     }

    public Person findPersonById(Integer id) {

        return this.personRepository
            .findById(id)
            .orElseThrow(() ->
        new RuntimeException("Pessoa não encontrada"));
    }

    public List<Person> findByNameContaining(String name) {

        return personRepository.findByNameContainingIgnoreCase(name);
    }

     public Iterable<Person> findAllPeople() {
         return personRepository.findAll();
     }

     public Person updatePerson(Person obj, Integer id) {
         obj.setId(id);
         return personRepository.save(obj);
     }

     public void deletePerson(Integer id) {
         personRepository.deleteById(id);
     }
}
