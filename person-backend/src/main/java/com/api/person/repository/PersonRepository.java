package com.api.person.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.person.model.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer> {

    List<Person> findByNameContainingIgnoreCase(String name);
    
}
