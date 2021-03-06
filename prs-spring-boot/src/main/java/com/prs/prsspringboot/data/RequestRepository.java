package com.prs.prsspringboot.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.prs.prsspringboot.business.Request;
import com.prs.prsspringboot.business.User;

public interface RequestRepository extends CrudRepository<Request, Integer> {
	
	List<Request> findByUser(User user);
	List<Request>findByStatusAndUserNot(String status, User user);

}
