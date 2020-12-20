package com.insight.challenge.insighttrackingplatform.resources;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insight.challenge.insighttrackingplatform.models.User;
import com.insight.challenge.insighttrackingplatform.repositories.UsersRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class UserResource {

	@Autowired
	UsersRepository usersRepository;

	@GetMapping("/users")
	@ApiOperation(value = "Returns the list of users registered in the application")
	public List<User> listUsers() {
		return usersRepository.findAll();
	}

	@GetMapping("/users/{id}")
	@ApiOperation(value = "Returns a user according to the given id")
	public User listUserById(@PathVariable(value = "id") UUID id) {
		return usersRepository.findById(id);
	}

	@PostMapping("/users")
	@ApiOperation(value = "Register a user in the application")
	public User registerUser(@RequestBody User user) {
		return usersRepository.save(user);
	}

	@DeleteMapping("/users")
	@ApiOperation(value = "Deletes a user according to the given id")
	public void deleteUser(@RequestParam UUID user_id) {
		User user = usersRepository.findById(user_id);
		usersRepository.delete(user);
	}

	@PutMapping("/users")
	@ApiOperation(value = "Updates a user")
	public User updateUser(@RequestBody User user) {
		return usersRepository.save(user);
	}

}
