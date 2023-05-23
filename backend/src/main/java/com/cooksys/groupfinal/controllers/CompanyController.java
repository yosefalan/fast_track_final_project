package com.cooksys.groupfinal.controllers;

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
public class CompanyController {
	
	private final CompanyService companyService;
	
	@GetMapping("/{id}/users")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
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

    @PostMapping("/{companyId}/announcements")
    public AnnouncementDto postAnnouncement(@PathVariable Long companyId, @RequestBody Announcement announcement){
        return companyService.postAnnouncement(companyId, announcement);
    }

    @PostMapping("/{companyId}/teams/{teamId}/projects")
    public ProjectDto postProject(@PathVariable Long companyId, @PathVariable Long teamId, @RequestBody Project project){
        return companyService.postProject(companyId, teamId, project);
    }

    @DeleteMapping("/{companyId}/users/{userId}")
    public FullUserDto deleteUser(@PathVariable Long companyId, @PathVariable Long userId){
        return companyService.deleteUser(companyId, userId);
    }

}
