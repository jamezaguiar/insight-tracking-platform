package com.insight.challenge.insighttrackingplatform.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insight.challenge.insighttrackingplatform.models.Activity;
import com.insight.challenge.insighttrackingplatform.repositories.ActivitiesRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class ActivitiesResource {

	@Autowired
	ActivitiesRepository activitiesRepository;

	@GetMapping("/activities")
	@ApiOperation(value = "Returns a list with all activities registered in the application")
	public List<Activity> listActivities() {
		return activitiesRepository.findAll();
	}

}
