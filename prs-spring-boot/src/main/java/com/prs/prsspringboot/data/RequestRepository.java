package com.prs.prsspringboot.data;

import org.springframework.data.repository.CrudRepository;

import com.prs.prsspringboot.business.Request;

public interface RequestRepository extends CrudRepository<Request, Integer> {

}
