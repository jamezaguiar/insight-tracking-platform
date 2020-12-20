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

import com.insight.challenge.insighttrackingplatform.models.Activity;
import com.insight.challenge.insighttrackingplatform.models.User;
import com.insight.challenge.insighttrackingplatform.repositories.ActivitiesRepository;
import com.insight.challenge.insighttrackingplatform.repositories.UsersRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class ActivitiesResource {

	@Autowired
	UsersRepository usersRepository;

	@Autowired
	ActivitiesRepository activitiesRepository;

	@GetMapping("/activities")
	@ApiOperation(value = "Returns a list with all activities registered in the application")
	public List<Activity> listActivities() {
		return activitiesRepository.findAll();
	}
	
	@GetMapping("/activities/{user_id}")
	@ApiOperation(value="Returns a list with all user activities")
	public List<Activity> listUserActivities(@PathVariable(value = "user_id") UUID user_id) {
		return activitiesRepository.findByUserId(user_id);
	}

	@PostMapping("/activities/{user_id}")
	@ApiOperation(value = "Records an activity for a specific user")
	public Activity registerActivity(@RequestBody Activity activity, @PathVariable(value = "user_id") UUID user_id) {
		User user = usersRepository.findById(user_id);
		Activity newActivity = new Activity(activity.getName(), activity.getDescription(), activity.getYear(), user);
		List<Activity> userActivities = user.getActivities();
		userActivities.add(newActivity);
		user.setActivities(userActivities);

		return activitiesRepository.save(newActivity);

	}
	
	@DeleteMapping("/activities")
	@ApiOperation(value = "Deletes a activity according to the given id")
	public void deleteActivity(@RequestParam UUID activity_id) {
		Activity activity = activitiesRepository.findById(activity_id);
		activitiesRepository.delete(activity);
	}

	@PutMapping("/activities")
	@ApiOperation(value = "Updates a activity")
	public Activity updateActivity(@RequestBody Activity activity) {
		return activitiesRepository.save(activity);
	}

}
