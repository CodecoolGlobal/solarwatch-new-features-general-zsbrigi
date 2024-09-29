package com.codecool.solarwatch.controller;

import com.codecool.solarwatch.model.dto.SolarReport;
import com.codecool.solarwatch.model.dto.SolarWatchDTO;
import com.codecool.solarwatch.model.dto.UserDTO;
import com.codecool.solarwatch.model.user.AddNewAdmin;
import com.codecool.solarwatch.service.SolarWatchService;
import com.codecool.solarwatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final SolarWatchService solarWatchService;

    @Autowired
    public AdminController(UserService userService, SolarWatchService solarWatchService) {
        this.userService = userService;
        this.solarWatchService = solarWatchService;
    }

    @GetMapping("/users")
    public List<UserDTO> getAllUser() {
        return userService.getAllUser();
    }

    @PutMapping("/newAdmin")
    public void changeUserRoleToAdmin(@RequestBody AddNewAdmin newAdmin) {
        userService.changeUserRoleToAdmin(newAdmin.username());
    }

    @GetMapping("/me")
    public String me() {
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return user.getUsername();
    }


    @PostMapping("/addNewSolar")
    public SolarReport addNewSolarWatchInformation(@RequestBody SolarWatchDTO solarWatch) {
        return solarWatchService.addNewSunsetSunriseForCity(solarWatch.city(), solarWatch.date());
    }

    @DeleteMapping("/deleteUser")
    public void deleteUser(@RequestBody String username) {
        userService.deleteUser(username);
    }

    @DeleteMapping("/deleteSolar")
    public void deleteSolarWatch(@RequestParam String city) {
        solarWatchService.deleteCity(city);
    }



}
