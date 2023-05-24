package com.cooksys.groupfinal.services;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Project;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


public interface CompanyService {

	Set<FullUserDto> getAllUsers(Long id);

	List<AnnouncementDto> getAllAnnouncements(Long id);

	Set<TeamDto> getAllTeams(Long id);

	Set<ProjectDto> getAllProjects(Long companyId, Long teamId);

	TeamDto createTeam(Long id, TeamRequestDto teamRequestDto);

	ProjectDto editProject(Long id, Long teamId, Long projectId, ProjectRequestDto projectRequestDto);

	AnnouncementDto postAnnouncement(Long companyId, AnnouncementRequestDto announcementRequestDto);

	ProjectDto postProject(Long companyId, Long teamId, Project project);

	FullUserDto deleteUser(Long companyId, Long userId);

}
