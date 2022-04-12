package com.prs.prsspringboot.ui;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prs.prsspringboot.business.LineItem;
import com.prs.prsspringboot.business.Request;
import com.prs.prsspringboot.business.Vendor;
import com.prs.prsspringboot.data.LineItemRepository;
import com.prs.prsspringboot.data.RequestRepository;



@RestController
@RequestMapping("/line-items")
public class LineItemController {
	
	@Autowired
	private LineItemRepository itemRepo;
	@Autowired
	private RequestRepository requestRepo;
	
	@CrossOrigin
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
	
	@CrossOrigin
	@PutMapping
	public List<LineItem> getAllByRequest(@RequestBody Request request) {
		List<LineItem> items = new ArrayList<LineItem>();
		
		try {
			items = itemRepo.findByRequest(request);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			
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
	@CrossOrigin
	@GetMapping("/")
	public List<LineItem> getAllLineItems() {
		List<LineItem> lineItems = new ArrayList<LineItem>();
		
		try {
			 Iterable<LineItem> result = itemRepo.findAll();
			 result.forEach(i -> lineItems.add(i));
			 
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		return lineItems;
	}
	@CrossOrigin
	@GetMapping("/{id}")
	public List<LineItem> getLineItemsById(@PathVariable int id){
		List<LineItem> lineItems = new ArrayList<LineItem>();
		
		try {
			Optional<LineItem> result = itemRepo.findById(id);
			result.ifPresent(v -> lineItems.add(v));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}				
		return lineItems;
	}
	@CrossOrigin
	@PutMapping("/{id}")
	public List<LineItem> updateLineItem(@RequestBody LineItem lineItem, @PathVariable int id) {
		List<LineItem> lineItems = new ArrayList<LineItem>();
		
		if (itemRepo.existsById(id)) {			
			try {
				Optional<LineItem> result = itemRepo.findById(id);
				if (result.isPresent()) {
					lineItems.add(result.get());
					itemRepo.deleteById(id);
					recalculateTotal(result.get().getRequest());
				}
			} catch (DataIntegrityViolationException dive) {
				System.out.println(dive.getMessage());
			}
		}
		
		return lineItems;
	}
	@CrossOrigin
	@DeleteMapping("/{id}")	
	public List<LineItem> deleteLineItem(@PathVariable int id) {
		List<LineItem> lineItems = new ArrayList<LineItem>();
		
		if (itemRepo.existsById(id)) {
			try {
				Optional<LineItem> result = itemRepo.findById(id);
				if (result.isPresent()) {
					lineItems.add(result.get());
					itemRepo.deleteById(id);
					recalculateTotal(result.get().getRequest());
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		} 
		return lineItems;
	}

}
