package com.insight.challenge.insighttrackingplatform.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insight.challenge.insighttrackingplatform.models.User;

public interface UsersRepository extends JpaRepository<User, Long> {

	User findById(UUID id);

}
