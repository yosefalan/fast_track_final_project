package com.cooksys.groupfinal.services.impl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.*;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.mappers.*;
import com.cooksys.groupfinal.repositories.*;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;
	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	private final AnnouncementRepository announcementRepository;
	private final UserRepository userRepository;

	private final ProjectRepository projectRepository;
	
	private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }

	private Set<Team> getTeamsByUser(Long userId){
		Optional<User> user = userRepository.findById(userId);
		if(user.isEmpty()){
			throw new NotFoundException("User was not found");
		}
		Set<Team> teams = user.get().getTeams();
		return teams;
	}

	private User findUser(Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty()) {
			throw new NotFoundException("A user with the provided id does not exist.");
		}
		return user.get();
	}

	private Announcement findAnnouncement(Long id){
		Optional<Announcement> announcement = announcementRepository.findById(id);
		if(announcement.isEmpty()){
			throw new NotFoundException("An announcement with the provided id does not exist.");
		}
		return announcement.get();
	}


	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	public AnnouncementDto postAnnouncement(Long companyId, Announcement announcement){
		Company company = findCompany(companyId);
		announcement.setCompany(company);

		announcementRepository.saveAndFlush(announcement);
		companyRepository.saveAndFlush(company);

		return announcementMapper.entityToDto(announcement);

	}

	@Override
	public ProjectDto postProject(Long companyId, Long teamId, Project project){
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		team.setCompany(company);
		project.setTeam(team);

		projectRepository.saveAndFlush(project);
		teamRepository.saveAndFlush(team);
		companyRepository.saveAndFlush(company);

		return projectMapper.entityToDto(project);
	}

	@Override
	public FullUserDto deleteUser(Long companyId, Long userId){
		Company company = findCompany(companyId);
		User userToDelete = findUser(userId);
		Set<Team> teams = getTeamsByUser(userId);

		for(Team t : teams){
			t.getTeammates().remove(userToDelete);
			teamRepository.saveAllAndFlush(teams);
		}

		company.getEmployees().remove(userToDelete);
		userRepository.saveAllAndFlush(company.getEmployees());

		for(Team t: company.getTeams()){
			t.getTeammates().remove(userToDelete);
		}
		teamRepository.saveAllAndFlush(userToDelete.getTeams());
		teamRepository.saveAllAndFlush(company.getTeams());

		return fullUserMapper.entityToFullUserDto(userToDelete);
	}

}
