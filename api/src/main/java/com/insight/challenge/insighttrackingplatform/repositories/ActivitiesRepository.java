package com.insight.challenge.insighttrackingplatform.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insight.challenge.insighttrackingplatform.models.Activity;

public interface ActivitiesRepository extends JpaRepository<Activity, Long> {
	
	Activity findById(UUID id);
	
	List<Activity> findByCandidateId(UUID candidate_id);
	
	List<Activity> findByName(String activity_name);
	
}
