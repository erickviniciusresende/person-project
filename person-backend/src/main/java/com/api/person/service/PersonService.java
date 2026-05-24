package com.api.person.service;

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
            .orElse(null);
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
