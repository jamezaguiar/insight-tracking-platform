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

import com.insight.challenge.insighttrackingplatform.models.Candidate;
import com.insight.challenge.insighttrackingplatform.repositories.ActivitiesRepository;
import com.insight.challenge.insighttrackingplatform.repositories.CandidatesRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class CandidatesResource {

	@Autowired
	CandidatesRepository candidatesRepository;

	@Autowired
	ActivitiesRepository activitiesRepository;

	@GetMapping("/candidates")
	@ApiOperation(value = "Returns a list of candidates registered in the application.")
	public List<Candidate> listCandidates() {
		return candidatesRepository.findAll();
	}

	@GetMapping("/candidates/activities")
	@ApiOperation(value = "Returns a list of candidates with a common activity.")
	public List<Candidate> listCandidatesByActivity(@RequestParam String activity_name) {
		return candidatesRepository.findByActivitiesName(activity_name);
	}

	@GetMapping("/candidates/{id}")
	@ApiOperation(value = "Returns a candidate according to the given id.")
	public Candidate listCandidateById(@PathVariable(value = "id") UUID id) {
		return candidatesRepository.findById(id);
	}

	@PostMapping("/candidates")
	@ApiOperation(value = "Register a candidate in the application.")
	public Candidate registerCandidate(@RequestBody Candidate candidate) {
		return candidatesRepository.save(candidate);
	}

	@DeleteMapping("/candidates")
	@ApiOperation(value = "Deletes a candidate according to the given id.")
	public void deleteCandidate(@RequestParam UUID candidate_id) {
		Candidate candidate = candidatesRepository.findById(candidate_id);
		candidatesRepository.delete(candidate);
	}

	@PutMapping("/candidates")
	@ApiOperation(value = "Updates a candidate.")
	public Candidate updateCandidate(@RequestBody Candidate candidate) {
		Candidate findCandidate = candidatesRepository.findById(candidate.getId());
		findCandidate.setName(candidate.getName());
		findCandidate.setEmail(candidate.getEmail());
		findCandidate.setAddress(candidate.getAddress());
		return candidatesRepository.save(findCandidate);
	}

}
