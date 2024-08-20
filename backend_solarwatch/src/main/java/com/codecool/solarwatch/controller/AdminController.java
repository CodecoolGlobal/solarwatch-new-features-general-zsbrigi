package com.codecool.solarwatch.controller;

import com.codecool.solarwatch.model.dto.SolarWatchDTO;
import com.codecool.solarwatch.model.user.AddNewAdmin;
import com.codecool.solarwatch.model.user.UserRequest;
import com.codecool.solarwatch.service.SolarWatchService;
import com.codecool.solarwatch.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final SolarWatchService solarWatchService;

    public AdminController(UserService userService, SolarWatchService solarWatchService) {
        this.userService = userService;
        this.solarWatchService = solarWatchService;
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateAdmin(@RequestBody UserRequest login) {
//        return ResponseEntity.ok(userService.LoginUser(login));
//    }

    @PutMapping("/newAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> addAdmin(@RequestBody AddNewAdmin newAdmin) {
        userService.addAdmin(newAdmin.username());
        return ResponseEntity.ok(null);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ADMIN')")
    public String me() {
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return user.getUsername();
    }


    @PostMapping("/addNewSolar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewSolarWatchInformation(@RequestBody SolarWatchDTO solarWatch) {
        return ResponseEntity.ok(solarWatchService.addNewSunsetSunriseForCity(solarWatch.city(), solarWatch.date()));
    }

    @DeleteMapping("/deleteSolar")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteSolarWatch(@RequestParam String city) {
        solarWatchService.deleteSunriseSunriseByCityName(city);
    }

}
