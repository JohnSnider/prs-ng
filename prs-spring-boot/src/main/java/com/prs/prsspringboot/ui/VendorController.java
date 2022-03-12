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
import com.prs.prsspringboot.business.Vendor;
import com.prs.prsspringboot.data.VendorRepository;

@RestController
@RequestMapping("/vendors")
public class VendorController {
	
	@Autowired
	private VendorRepository vendorRepo;
	
	@GetMapping("/")
	public List<Vendor> getAllVendors() {
		List<Vendor> vendors = new ArrayList<Vendor>();
		
		try {
			 Iterable<Vendor> result = vendorRepo.findAll();
			 result.forEach(v -> vendors.add(v));
			 
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		return vendors;
	}
	
	@GetMapping("/{id}")
	public List<Vendor> getVendorById(@PathVariable int id){
		List<Vendor> vendors = new ArrayList<Vendor>();
		
		try {
			Optional<Vendor> result = vendorRepo.findById(id);
			result.ifPresent(v -> vendors.add(v));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
				
		return vendors;
	}
	
	@PostMapping
	public List<Vendor> createVendor(@RequestBody Vendor vendor) {
		List<Vendor> vendors = new ArrayList<Vendor>();
	 
		try {
			vendors.add(vendorRepo.save(vendor));
		} catch (DataIntegrityViolationException dive) {
			System.out.println(dive.getMessage());
		}
		
		return vendors; 
	}
	
	@PutMapping("/{id}")
	public List<Vendor> updateVendor(@RequestBody Vendor vendor, @PathVariable int id) {
		List<Vendor> vendors = new ArrayList<Vendor>();
		
		if (vendorRepo.existsById(id)) {			
			try {
				vendors.add(vendorRepo.save(vendor));
			} catch (DataIntegrityViolationException dive) {
				System.out.println(dive.getMessage());
			}
		}
		
		return vendors;
	}
	
	@DeleteMapping("/{id}")	
	public List<Vendor> deleteVendor(@PathVariable int id) {
		List<Vendor> vendors = new ArrayList<Vendor>();
		
		if (vendorRepo.existsById(id)) {
			try {
				Optional<Vendor> result = vendorRepo.findById(id);
				if (result.isPresent()) {
					vendors.add(result.get());
					vendorRepo.deleteById(id);
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		} 
		return vendors;
	}


}
