package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	Set<CompanyDto> getCompanyByUserId(Long id);

   
}
