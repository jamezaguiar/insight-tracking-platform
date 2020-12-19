package com.insight.challenge.insighttrackingplatform.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping(value = "/api")
public class UserResource {

	@Autowired
	UsersRepository usersRepository;

	@GetMapping("/users")
	public List<User> listUsers() {
		return usersRepository.findAll();
	}

	@GetMapping("/users/{id}")
	public User listUserById(@PathVariable(value = "id") long id) {
		return usersRepository.findById(id);
	}

	@PostMapping("/users")
	public User registerUser(@RequestBody User user) {
		return usersRepository.save(user);
	}

	@DeleteMapping("/users")
	public void deleteUser(@RequestParam long user_id) {
		User user = usersRepository.findById(user_id);
		usersRepository.delete(user);
	}

	@PutMapping("/users")
	public User updateUser(@RequestBody User user) {
		return usersRepository.save(user);
	}

}
