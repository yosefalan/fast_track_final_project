package com.cooksys.groupfinal.controllers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Project;
import org.springframework.web.bind.annotation.*;


import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class CompanyController {
	
	private final CompanyService companyService;
	
	@GetMapping("/{id}/users")
    public List<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
    public List<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@GetMapping("/{id}/teams")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects") 
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}

	@PostMapping("/{id}/teams")
    public TeamDto createTeam(@PathVariable Long id, @RequestBody TeamRequestDto teamRequestDto) {
        return companyService.createTeam(id, teamRequestDto);
    }
	
	@PatchMapping("/{id}/teams/{teamId}/projects/{projectId}")
	public ProjectDto editProject(@PathVariable Long id, @PathVariable Long teamId,@PathVariable Long projectId,
			@RequestBody ProjectRequestDto projectRequestDto) {
		return companyService.editProject(id, teamId, projectId, projectRequestDto);
	}

    @PostMapping("/{companyId}/announcements")
    public AnnouncementDto postAnnouncement(@PathVariable Long companyId, @RequestBody AnnouncementRequestDto announcementRequestDto){
        return companyService.postAnnouncement(companyId, announcementRequestDto);
    }

    @PostMapping("/{companyId}/teams/{teamId}/projects")
    public ProjectDto postProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody Project project){
        return companyService.postProject(companyId, teamId, project);
    }

    @DeleteMapping("/{companyId}/users/{userId}")
    public FullUserDto deleteUser(@PathVariable Long companyId, @PathVariable Long userId){
        return companyService.deleteUser(companyId, userId);
    }

    @PostMapping("/{companyId}/users")
    public BasicUserDto addUser(@PathVariable Long companyId, @RequestBody UserRequestDto userRequestDto){
        return companyService.addUser(companyId, userRequestDto);
    }

}
