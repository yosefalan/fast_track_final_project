package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;

import java.util.Set;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	Set<TeamDto> getTeamsByUser(Long userId);

   
}
