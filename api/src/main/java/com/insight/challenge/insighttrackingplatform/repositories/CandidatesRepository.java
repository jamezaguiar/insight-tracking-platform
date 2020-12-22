package com.insight.challenge.insighttrackingplatform.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insight.challenge.insighttrackingplatform.models.Candidate;

public interface CandidatesRepository extends JpaRepository<Candidate, Long> {

	Candidate findById(UUID id);

	List<Candidate> findByActivitiesName(String activity_name);
}
