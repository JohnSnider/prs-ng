package com.prs.prsspringboot.ui;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prs.prsspringboot.business.LineItem;
import com.prs.prsspringboot.business.Request;
import com.prs.prsspringboot.business.User;
import com.prs.prsspringboot.data.LineItemRepository;
import com.prs.prsspringboot.data.RequestRepository;



@RestController
@RequestMapping("/line-items")
public class LineItemController {
	
	@Autowired
	private LineItemRepository itemRepo;
	@Autowired
	private RequestRepository requestRepo;
	
	@PostMapping
	public List<LineItem> createLineItem(@RequestBody LineItem lineItem) {
		List<LineItem> items = new ArrayList<LineItem>();
	 
		try {
			items.add(itemRepo.save(lineItem));
			recalculateTotal(lineItem.getRequest());
		} catch (DataIntegrityViolationException dive) {
			System.out.println(dive.getMessage());
		}
		
		return items; 
	}
	
	private void recalculateTotal(Request request) {
		double newTotal = 0.0;
		
		List<LineItem> items = new ArrayList<LineItem>();
		
		try {
		Iterable<LineItem> result = itemRepo.findByRequestId(request.getId());
		result.forEach(i -> items.add(i));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		for (LineItem item : items) {
			newTotal += (item.getProduct().getPrice() * item.getQuantity());
		}
		
		request.setTotal(newTotal);
		
		if (requestRepo.existsById(request.getId())) {
			try {
				requestRepo.save(request);
			} catch (DataIntegrityViolationException dive) {
				System.out.println(dive.getMessage());
			}
		}
	}

}
