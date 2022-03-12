package com.prs.prsspringboot.data;

import org.springframework.data.repository.CrudRepository;

import com.prs.prsspringboot.business.LineItem;

public interface LineItemRepository extends CrudRepository<LineItem, Integer> {
	
	Iterable<LineItem> findByRequestId(int requestId);

}
