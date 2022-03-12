package com.prs.prsspringboot.ui;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prs.prsspringboot.business.Product;
import com.prs.prsspringboot.data.ProductRepository;

@RestController
@RequestMapping("/products")

public class ProductController {
	
	@Autowired
	private ProductRepository productRepo;
	
	@GetMapping("/")
	public List<Product> getAllProducts() {
		List<Product> products = new ArrayList<Product>();
		
		try {
			 Iterable<Product> result = productRepo.findAll();
			 result.forEach(p -> products.add(p));
			 
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		return products;
	}
	
	@GetMapping("/{id}")
	public List<Product> getProductById(@PathVariable int id){
		List<Product> products = new ArrayList<Product>();
		
		try {
			Optional<Product> result = productRepo.findById(id);
			result.ifPresent(p -> products.add(p));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
				
		return products;
	}
	
	@PostMapping
	public List<Product> createProduct(@RequestBody Product product) {
		List<Product> products = new ArrayList<Product>();
	 
		try {
			products.add(productRepo.save(product));
		} catch (DataIntegrityViolationException dive) {
			System.out.println(dive.getMessage());
		}
		
		return products; 
	}
	
	@PutMapping("/{id}")
	public List<Product> updateProduct(@RequestBody Product product, @PathVariable int id) {
		List<Product> products = new ArrayList<Product>();
		
		if (productRepo.existsById(id)) {			
			try {
				products.add(productRepo.save(product));
			} catch (DataIntegrityViolationException dive) {
				System.out.println(dive.getMessage());
			}
		}
		
		return products;
	}
	
	@DeleteMapping("/{id}")	
	public List<Product> deleteProduct(@PathVariable int id) {
		List<Product> products = new ArrayList<Product>();
		
		if (productRepo.existsById(id)) {
			try {
				Optional<Product> result = productRepo.findById(id);
				if (result.isPresent()) {
					products.add(result.get());
					productRepo.deleteById(id);
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		} 
		return products;
	}

	
}
