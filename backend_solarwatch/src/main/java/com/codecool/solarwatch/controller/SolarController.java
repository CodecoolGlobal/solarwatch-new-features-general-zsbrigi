package com.codecool.solarwatch.controller;

import com.codecool.solarwatch.model.Cities;
import com.codecool.solarwatch.model.Dates;
import com.codecool.solarwatch.model.SolarReport;
import com.codecool.solarwatch.service.SolarWatchService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/user")
public class SolarController {
    private final SolarWatchService openSolarService;

    public SolarController(SolarWatchService openSolarService) {
        this.openSolarService = openSolarService;
    }


    @GetMapping("/solar")
    @PreAuthorize("hasRole('USER')")
    public SolarReport getSolarReport(@RequestParam(defaultValue = "London") String city, @RequestParam LocalDate date) {
        return openSolarService.getSunsetSunriseForCity(city, date);
    }

    @GetMapping("/cities")
    @PreAuthorize("hasRole('USER')")
    public Cities getSolarCities() {
        return openSolarService.getAllCities();
    }

    @GetMapping("/dates")
    @PreAuthorize("hasRole('USER')")
    public Dates getDates(@RequestParam String city) {
        return openSolarService.getAllDatesForCity(city);
    }
}
