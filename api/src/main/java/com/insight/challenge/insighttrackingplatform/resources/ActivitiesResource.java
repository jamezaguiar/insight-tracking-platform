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
import com.insight.challenge.insighttrackingplatform.models.Candidate;
import com.insight.challenge.insighttrackingplatform.repositories.ActivitiesRepository;
import com.insight.challenge.insighttrackingplatform.repositories.CandidatesRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class ActivitiesResource {

	@Autowired
	CandidatesRepository candidatesRepository;

	@Autowired
	ActivitiesRepository activitiesRepository;

	@GetMapping("/activities")
	@ApiOperation(value = "Returns a list with all activities registered in the application.")
	public List<Activity> listActivities() {
		return activitiesRepository.findAll();
	}

	@GetMapping("/activities/{candidate_id}")
	@ApiOperation(value = "Returns a list with all candidate activities.")
	public List<Activity> listCandidateActivities(@PathVariable(value = "candidate_id") UUID candidate_id) {
		return activitiesRepository.findByCandidateId(candidate_id);
	}

	@PostMapping("/activities/{candidate_id}")
	@ApiOperation(value = "Records an activity for a specific candidate.")
	public Activity registerActivity(@RequestBody Activity activity, @PathVariable(value = "candidate_id") UUID candidate_id) {
		Candidate candidate = candidatesRepository.findById(candidate_id);
		Activity newActivity = new Activity(activity.getName(), activity.getDescription(), activity.getYear(), candidate);
		List<Activity> candidateActivities = candidate.getActivities();
		candidateActivities.add(newActivity);
		candidate.setActivities(candidateActivities);

		return activitiesRepository.save(newActivity);

	}

	@DeleteMapping("/activities")
	@ApiOperation(value = "Deletes a activity according to the given id.")
	public void deleteActivity(@RequestParam UUID activity_id) {
		Activity activity = activitiesRepository.findById(activity_id);
		activitiesRepository.delete(activity);
	}

	@PutMapping("/activities/{candidate_id}")
	@ApiOperation(value = "Updates a activity.")
	public Activity updateActivity(@RequestBody Activity activity,
			@PathVariable(value = "candidate_id") UUID candidate_id) {
		Candidate candidate = candidatesRepository.findById(candidate_id);
		List<Activity> candidateActivities = candidate.getActivities();
		Activity findActivity = activitiesRepository.findById(activity.getId());
		candidateActivities.remove(findActivity);
		findActivity.setName(activity.getName());
		findActivity.setDescription(activity.getDescription());
		findActivity.setYear(activity.getYear());
		findActivity.setCandidate(candidate);
		candidateActivities.add(findActivity);
		candidate.setActivities(candidateActivities);

		return activitiesRepository.save(findActivity);
	}
	
	@GetMapping("/candidate/activities/{activity_id}")
	@ApiOperation(value = "Returns a specific activity.")
	public Activity listActivity(@PathVariable(value = "activity_id") UUID activity_id) {
		return activitiesRepository.findById(activity_id);
	}

}
